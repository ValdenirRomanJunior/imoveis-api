package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.security.UserSS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    
    @Autowired
    private ImageRepository imageRepository;

    @Value("${img.prefix.tenant.property}")
    private String prefix;
    
    @Value("${img.prefix.tenant.profile}")
    private String prefixProfile;

    public URI uploadPropertyPictures(MultipartFile multipartFile) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new RuntimeException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = prefix + user.getId()+ ".jpg";
       
        return s3Service.uploaFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
    }
    
    public URI uploadProfilePictures(MultipartFile multipartFile) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new RuntimeException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = prefixProfile + user.getId()+ ".jpg";
       
        return s3Service.uploaFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
    }
    
    public Page<Image> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return imageRepository.findAll(pageRequest);
    }

}
