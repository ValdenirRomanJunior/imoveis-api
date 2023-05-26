package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.repositories.ImageUrlRepository;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.FileException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class ImageUrlService {
	
    @Autowired
    private ImageUrlRepository imageUrlRepository;


    
    public java.util.List<ImageUrl> findByIdTenantAndUrl(Long idTenant, String url) {
        java.util.List<ImageUrl> imageUrl = imageUrlRepository.findDistinctByIdTenantAndUrl(idTenant, url);
        
        return imageUrl;

    }



	public void deleteAllById(List<Long> ids) {
		  try {
	            imageUrlRepository.deleteAllById(ids);
	           
	        } catch (DataIntegrityViolationException e) {
	            throw new DataIntegrityException("impossible delete with other objects: ");
	        }
		
	}
}
