package com.dynamous.imoveis.services;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectTaggingResult;
import com.amazonaws.services.s3.model.DeleteObjectsResult.DeletedObject;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.MultiObjectDeleteException.DeleteError;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.repositories.ImageUrlRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.FileException;

import software.amazon.awssdk.services.clouddirectory.model.DeleteObjectResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class S3Service {

    private Logger LOG = LoggerFactory.getLogger(S3Service.class);
    
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;
    
    @Autowired
    private ImageUrlService imageUrlService;
    
    @Autowired
    private ImageUrlRepository imageUrlRepository;
    
    @Autowired
    private AmazonS3 s3client;

    @Value("${s3.bucket}")
    private String bucketName;
    
    @Value("${img.prefix.tenant.property}")
    private String prefix;

    public URI uploaFile(MultipartFile multipartFile){
        try {
            String fileName = multipartFile.getOriginalFilename();
            InputStream is = multipartFile.getInputStream();
            String contentType = multipartFile.getContentType();
            return uploaFile(is,fileName,contentType);
        } catch (IOException e) {
          throw  new FileException(("Erro de Io" + e.getMessage()));
        }
    }
    public URI uploaFile(InputStream is, String fileName, String contentType) throws AmazonServiceException {
    	
    	  UserSS user = UserService.authenticated();
          if (user == null) {
        	  throw new AuthorizationException("erro");
          }
       
          Image image = new Image(null,null,user.getId());
          imageRepository.save(image);
          Optional<Image> imageId= imageRepository.findById(image.getId());
        try {
        	 
            
             ObjectMetadata meta = new ObjectMetadata();
             meta.setContentType(contentType);
             LOG.info("Iniciando upload");
             String newFileName = prefix + user.getId()+imageId.get().getId()+ ".jpg";
             
             s3client.putObject(bucketName, newFileName, is,meta);
             LOG.info("Finalizado upload");
             URI urlImage=s3client.getUrl(bucketName, newFileName).toURI();
             String url= String.valueOf(urlImage);
             
             Image imageComplete = new Image(imageId.get().getId(),url,user.getId());
             
             imageRepository.save(imageComplete);
             boolean exist = s3client.doesObjectExist(bucketName, newFileName);
           
             System.out.println(exist + "SE OBJETO EXISTE NO UPLOAD");
             return s3client.getUrl(bucketName,newFileName).toURI();
            
        } catch (URISyntaxException | AmazonClientException e) {
        	imageRepository.deleteById(imageId.get().getId());
           throw new FileException(("Erro ao converter URL para URI"));
           
        }
    }
    
    
    
    //service s3 para enviar foto do profile
    public URI uploaFileProfile(InputStream is, String fileName, String contentType) throws AmazonServiceException{
    	
  	  UserSS user = UserService.authenticated();
        if (user == null) {
        	throw new AuthorizationException("erro");
        }
               
      try {
           ObjectMetadata meta = new ObjectMetadata();
           meta.setContentType(contentType);
           LOG.info("Iniciando upload");
           
           s3client.putObject(bucketName, fileName, is,meta);
           LOG.info("Finalizado upload");
           URI urlImage=s3client.getUrl(bucketName, fileName).toURI();
           
           String url= String.valueOf(urlImage);
        
           return s3client.getUrl(bucketName,fileName).toURI();
          
      } catch (URISyntaxException | AmazonClientException  e) {
         throw new FileException(("Erro ao converter URL para URI"));
         
      }
  }
  
    
    
    
    public void deleteFile(Long id) throws URISyntaxException {
   	  UserSS user = UserService.authenticated();
      if (user == null) {
    	  throw new AuthorizationException("erro");
      }
 	 Image image= imageService.find(id);
 	
	 String deleteFileName ="tp"+user.getId()+image.getId()+".jpg";
    try {
         
         LOG.info("Iniciando delete");
                  
           s3client.deleteObject(bucketName, deleteFileName);
         
           boolean exist = s3client.doesObjectExist(bucketName, deleteFileName);
           System.out.println(exist + "SE OBJETO EXISTE");
           
   	    if(exist == false) {
   	         
   	        imageService.delete(id);
   	        List<ImageUrl> imageUrl =imageUrlService.findByIdTenantAndUrl(image.getIdTenant(),image.getUrl());
   	        List<Long> ids= new ArrayList<Long>();
   	        for( ImageUrl img: imageUrl ) {
   	       	 if(img !=null) {
   	       		 ids.add(img.getId());
   	       	 }
   	        }
   	        
   	        imageUrlService.deleteAllById(ids);
   	   	 
   	    }
         LOG.info("Finalizado delete");
   
        
    } catch (AmazonServiceException e) {
    	//dar rollback nos delets no banco
       throw new AmazonServiceException(("Erro ao deletar"));
    }
     



    }
}
