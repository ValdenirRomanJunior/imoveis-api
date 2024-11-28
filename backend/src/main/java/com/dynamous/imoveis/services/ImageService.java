package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.FileException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
	
    @Autowired
    private ImageRepository imageRepository;
    
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private AccountService accountService;

    //VERIFICA SE É PNG OU JPG
    public BufferedImage getJpgImageFromFile(MultipartFile uploadfile){
    	
    	
        String ext = FilenameUtils.getExtension(uploadfile.getOriginalFilename());
        System.out.println("CAIU AQUI"+ ext);
        if(!"png".equals(ext) && !"jpeg".equals(ext)){
            throw new FileException("Somente imagens PNG e JPG são permitidos");
        }
        		
        try {
            BufferedImage img = ImageIO.read(uploadfile.getInputStream());
           
            if("png".equals(ext)){
                img = pgnToJpg(img);
            }
            return img;
        } catch (IOException e) {
           throw new FileException("Erro ao ler arquivo");
        }

    }
    //CONVERTE PARA GRAVAR NO BUCKET EM JPG
    public BufferedImage pgnToJpg(BufferedImage img) {
    	
        BufferedImage jpgImage = new BufferedImage(img.getWidth(), img.getHeight(),BufferedImage.TYPE_INT_RGB);
        jpgImage.createGraphics().drawImage(img,0,0, Color.WHITE,null);
        return jpgImage;

    }

    public InputStream getInputStream(BufferedImage img, String extension){
        try{
            ByteArrayOutputStream os = new  ByteArrayOutputStream();
            ImageIO.write(img,extension,os);
            return new ByteArrayInputStream(os.toByteArray());
        }
        catch (IOException e){
            throw new FileException("erro ao ler arquivo");
        }
    }		
    		
    
    
    
    public com.dynamous.imoveis.entities.Image find(Long id) {
        Optional<com.dynamous.imoveis.entities.Image> image = imageRepository.findById(id);
        return image.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Id:" + ", Type" + Image.class.getName()));

    }
    
    public void delete(Long id) {
 
        try {
            imageRepository.deleteById(id);
        } catch (DataIntegrityViolationException | EmptyResultDataAccessException | StaleStateException e) {
            throw new DataIntegrityException("impossible delete with other objects: ");
        }
    }
    
	public java.util.List<Image> findAllByTenant(Long id) {	 
	        Tenant tenant= tenantService.find(id);
	    	Account account= accountService.find(tenant.getAccount().getId());
		java.util.List<Image>  images= imageRepository.findAllByIdAccount(account.getId());
		
		return images;
	}
	
    public void deleteAll(java.util.List<Long> ids) {
    	 
        try {
       
            imageRepository.deleteAllByIdInBatch(ids);
        } catch (DataIntegrityViolationException | EmptyResultDataAccessException | StaleStateException e) {
            throw new DataIntegrityException("impossible delete with other objects: caiu no image service ");
        }
    }
	public List<Image> findAllByProperty(Property property) {
		// TODO Auto-generated method stub
		return imageRepository.findAllByProperty(property);
	}
	
	 
}
