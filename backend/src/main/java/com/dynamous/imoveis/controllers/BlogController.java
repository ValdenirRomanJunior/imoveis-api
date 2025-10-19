package com.dynamous.imoveis.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.dynamous.imoveis.services.ImageService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/blog", produces = {MediaType.APPLICATION_JSON_VALUE})
public class BlogController {

    @Autowired
    private AmazonS3 s3client;

    @Autowired
    private ImageService imageService;

    @Value("${s3.bucket}")
    private String bucketName;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private String indexKey() {
        return "blog/posts/index.json";
    }

    private String postKey(String slug) {
        return "blog/posts/" + slug + ".json";
    }

    private String coverKey(String slug) {
        return "blog/covers/" + slug + ".jpg";
    }

    private String imageKey(String slug, String originalName) {
        String safeName = originalName == null ? "image" : originalName.replaceAll("[^a-zA-Z0-9._-]", "-");
        return "blog/images/" + slug + "/" + Instant.now().toEpochMilli() + "-" + safeName;
    }

    private String readObjectAsString(String key) throws IOException {
        if (!s3client.doesObjectExist(bucketName, key)) {
            return null;
        }
        try (InputStream is = s3client.getObject(bucketName, key).getObjectContent()) {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buf = new byte[4096];
            int read;
            while ((read = is.read(buf)) != -1) {
                baos.write(buf, 0, read);
            }
            return baos.toString(StandardCharsets.UTF_8.name());
        }
    }

    private void writeStringAsObject(String key, String content) {
        byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
        ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentLength(bytes.length);
        meta.setContentType("application/json; charset=utf-8");
        s3client.putObject(bucketName, key, bais, meta);
    }

    private URI putBinary(String key, InputStream is, String contentType) {
        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentType(contentType);
        s3client.putObject(bucketName, key, is, meta);
        try {
            return s3client.getUrl(bucketName, key).toURI();
        } catch (java.net.URISyntaxException e) {
            // Fallback para evitar falha de compilação e garantir retorno
            return URI.create(s3client.getUrl(bucketName, key).toString());
        }
    }

    // DTOs mínimos
    public static class BlogPostSummary {
        public String slug;
        public String title;
        public String excerpt;
        public String coverUrl;
        public List<String> tags;
        public String status; // PUBLISHED | DRAFT
        public String publishedAt; // ISO string
    }

    public static class BlogPost extends BlogPostSummary {
        public String contentMarkdown;
        public String author;
    }

    // Lista pública (somente publicados)
    @GetMapping("/posts")
    public ResponseEntity<List<BlogPostSummary>> listPosts() {
        try {
            String json = readObjectAsString(indexKey());
            if (json == null || json.trim().isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>());
            }
            List<BlogPostSummary> all = objectMapper.readValue(json, new TypeReference<List<BlogPostSummary>>(){});
            List<BlogPostSummary> published = all.stream()
                    .filter(p -> "PUBLISHED".equalsIgnoreCase(p.status))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(published);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    // Detalhe público
    @GetMapping("/posts/{slug}")
    public ResponseEntity<?> getPost(@PathVariable String slug) {
        try {
            String json = readObjectAsString(postKey(slug));
            if (json == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Post não encontrado"));
            }
            BlogPost post = objectMapper.readValue(json, BlogPost.class);
            if (!"PUBLISHED".equalsIgnoreCase(post.status)) {
                // Oculta rascunhos
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Post não encontrado"));
            }
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    // Admin: criar/atualizar post
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/admin/posts")
    public ResponseEntity<?> upsertPost(@RequestBody BlogPost post) {
        try {
            if (post == null || post.slug == null || post.slug.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Slug obrigatório"));
            }
            // Persistir arquivo do post
            String postJson = objectMapper.writeValueAsString(post);
            writeStringAsObject(postKey(post.slug), postJson);

            // Atualizar índice
            List<BlogPostSummary> indexList = new ArrayList<>();
            String indexJson = readObjectAsString(indexKey());
            if (indexJson != null && !indexJson.trim().isEmpty()) {
                indexList = objectMapper.readValue(indexJson, new TypeReference<List<BlogPostSummary>>(){});
            }
            // Remover existente e adicionar novo resumo
            indexList = indexList.stream()
                    .filter(p -> !post.slug.equals(p.slug))
                    .collect(Collectors.toList());
            BlogPostSummary summary = new BlogPostSummary();
            summary.slug = post.slug;
            summary.title = post.title;
            summary.excerpt = post.excerpt;
            summary.coverUrl = post.coverUrl;
            summary.tags = post.tags;
            summary.status = post.status;
            summary.publishedAt = post.publishedAt;
            indexList.add(summary);

            writeStringAsObject(indexKey(), objectMapper.writeValueAsString(indexList));

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Admin: deletar post (remove arquivo do post, capa e imagens do conteúdo)
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/admin/posts/{slug}")
    public ResponseEntity<?> deletePost(@PathVariable String slug) {
        try {
            // Remove arquivo do post
            if (s3client.doesObjectExist(bucketName, postKey(slug))) {
                s3client.deleteObject(bucketName, postKey(slug));
            }

            // Remove capa associada
            if (s3client.doesObjectExist(bucketName, coverKey(slug))) {
                s3client.deleteObject(bucketName, coverKey(slug));
            }

            // Remove todas as imagens do conteúdo sob o prefixo "blog/images/{slug}/"
            String prefix = "blog/images/" + slug + "/";
            com.amazonaws.services.s3.model.ListObjectsV2Request req = new com.amazonaws.services.s3.model.ListObjectsV2Request()
                    .withBucketName(bucketName)
                    .withPrefix(prefix);
            com.amazonaws.services.s3.model.ListObjectsV2Result res;
            do {
                res = s3client.listObjectsV2(req);
                for (com.amazonaws.services.s3.model.S3ObjectSummary s : res.getObjectSummaries()) {
                    s3client.deleteObject(bucketName, s.getKey());
                }
                req.setContinuationToken(res.getNextContinuationToken());
            } while (res.isTruncated());

            // Atualiza índice removendo o resumo do post
            String indexJson = readObjectAsString(indexKey());
            List<BlogPostSummary> indexList = new ArrayList<>();
            if (indexJson != null && !indexJson.trim().isEmpty()) {
                indexList = objectMapper.readValue(indexJson, new TypeReference<List<BlogPostSummary>>(){});
            }
            indexList = indexList.stream().filter(p -> !slug.equals(p.slug)).collect(Collectors.toList());
            writeStringAsObject(indexKey(), objectMapper.writeValueAsString(indexList));

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Admin: upload de capa (converte para JPG)
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping(value = "/admin/upload-cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadCover(@RequestParam("file") MultipartFile file,
                                         @RequestParam("slug") String slug) {
        try {
            BufferedImage jpgImage = imageService.getJpgImageFromFile(file);
            InputStream is = imageService.getInputStream(jpgImage, "jpg");
            URI uri = putBinary(coverKey(slug), is, "image/jpeg");
            return ResponseEntity.ok(Map.of("url", uri.toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Admin: upload de imagem do conteúdo (mantém tipo original)
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping(value = "/admin/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
                                         @RequestParam(value = "slug", required = false) String slug) {
        try {
            String key = imageKey(slug != null ? slug : "general", file.getOriginalFilename());
            URI uri = putBinary(key, file.getInputStream(), file.getContentType());
            return ResponseEntity.ok(Map.of("url", uri.toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}