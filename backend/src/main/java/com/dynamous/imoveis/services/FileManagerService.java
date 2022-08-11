package com.dynamous.imoveis.services;

import com.dynamous.imoveis.security.UserSS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.net.URI;

@Service
public class FileManagerService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private ImageService imageService;

    @Value("${img.prefix.tenant.property}")
    private String prefix;

    public URI uploadPropertyPictures(MultipartFile multipartFile) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new RuntimeException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = prefix + user.getId() + "jpg";

        return s3Service.uploaFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
    }
}
