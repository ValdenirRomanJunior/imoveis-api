package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LandingPageDTO;
import com.dynamous.imoveis.services.LandingPageService;
import com.dynamous.imoveis.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/paginas")
public class LandingPageController {

    @Autowired
    private LandingPageService service;

    @Autowired
    private S3Service s3Service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<LandingPageDTO> findById(@PathVariable Long id) {
        LandingPageDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    // Rota pública para visualização da Landing Page pelo slug
    @GetMapping(value = "/slug/{slug}")
    public ResponseEntity<LandingPageDTO> findBySlug(@PathVariable String slug) {
        LandingPageDTO obj = service.findBySlug(slug);
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LandingPageDTO> update(@PathVariable Long id, @RequestBody LandingPageDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Map<String, String>> uploadPicture(@RequestParam(name="file") MultipartFile file) {
        URI uri = s3Service.uploadLandingPageImage(file);
        Map<String, String> response = new HashMap<>();
        response.put("url", uri.toString());
        return ResponseEntity.ok().body(response);
    }
}
