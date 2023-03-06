package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;

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

    
    //SERVICE ENTIDADE PARA FOTO PROPRIEDADE
    public URI uploadPropertyPictures(MultipartFile multipartFile) {
        UserSS user = UserService.authenticated();
        if (user == null) {
        	throw new AuthorizationException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);                 	
        String fileName = prefix +user.getId()+".jpg";
       
        return s3Service.uploaFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
    }
    
    //SERVICE DA ENTIDADE PARA FOTO PROFILE
    public URI uploadProfilePictures(MultipartFile multipartFile) {
        UserSS user = UserService.authenticated();
        if (user == null) {
        	throw new AuthorizationException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = prefixProfile + user.getId()+ ".jpg";
       
        return s3Service.uploaFileProfile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image");
    }
    
    
    public Page<Image> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return imageRepository.findAll(pageRequest);
    }

    
	public void deleteFile(Long id) {		
	     UserSS user = UserService.authenticated();
	        if (user == null) {
	            throw new AuthorizationException("erro");
	        }
	       
	        
	        s3Service.deleteFile(id);
	        
		
	}

}
