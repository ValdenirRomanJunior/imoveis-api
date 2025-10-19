package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.Property;
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
import java.net.URISyntaxException;

@Service
public class FileManagerService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private ImageService imageService;
    
    @Autowired
    private ImageRepository imageRepository;
    
    
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private AccountService accountService;

    @Value("${img.prefix.tenant.property}")
    private String prefix;
    
    @Value("${img.prefix.tenant.profile}")
    private String prefixProfile;

    
    //SERVICE ENTIDADE PARA FOTO PROPRIEDADE
    public URI uploadPropertyPictures(MultipartFile multipartFile, Account account, Property property) {
        UserSS user = UserService.authenticated();
        if (user == null) {
        	throw new AuthorizationException("erro");
        }
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);                 	
        String fileName = prefix +user.getId()+".jpg";
       
        return s3Service.uploaFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image", account, property);
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
    
    //SERVICE PARA UPLOAD DE LOGO DO TEMA
    public URI uploadThemeLogo(MultipartFile multipartFile) {
        // For theme uploads, use a fixed tenant ID (1) since themes are public
        BufferedImage pngImage = imageService.getPngImageFromFile(multipartFile);
        String fileName = "logo_theme_1.png";
       
        return s3Service.uploadThemeFile(imageService.getPngInputStream(pngImage), fileName, "image/png");
    }

    // Novo: upload de logo com accountId no nome do arquivo
    public URI uploadThemeLogoWithAccountId(MultipartFile multipartFile, Long accountId) {
        BufferedImage pngImage = imageService.getPngImageFromFile(multipartFile);
        String fileName = "logo_theme_" + accountId + ".png";
        return s3Service.uploadThemeFile(imageService.getPngInputStream(pngImage), fileName, "image/png");
    }
    
    //SERVICE PARA GERAR FAVICON A PARTIR DO LOGO
    public String generateFaviconFromLogo(MultipartFile multipartFile, Long accountId) {
        try {
            // Get PNG image from uploaded logo
            BufferedImage originalImage = imageService.getPngImageFromFile(multipartFile);
            
            // Generate favicon in different sizes
            BufferedImage favicon16 = imageService.resizeImageForFavicon(originalImage, 16);
            BufferedImage favicon32 = imageService.resizeImageForFavicon(originalImage, 32);
            BufferedImage faviconIco = imageService.resizeImageForFavicon(originalImage, 32); // Use 32x32 for .ico
            
            // Upload favicon files with accountId in the filename
            String fileName16 = "favicon-16x16_" + accountId + ".png";
            String fileName32 = "favicon-32x32_" + accountId + ".png";
            String fileNameIco = "favicon_" + accountId + ".ico";
            
            // Upload all favicon sizes
            s3Service.uploadThemeFile(imageService.getPngInputStream(favicon16), fileName16, "image/png");
            s3Service.uploadThemeFile(imageService.getPngInputStream(favicon32), fileName32, "image/png");
            URI faviconUri = s3Service.uploadThemeFile(imageService.getFaviconInputStream(faviconIco), fileNameIco, "image/x-icon");
            
            return faviconUri.toString(); // Return the main favicon.ico URI as String
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar favicon: " + e.getMessage());
        }
    }
    
    //SERVICE PARA UPLOAD DE BANNER DO TEMA
    public URI uploadThemeBanner(MultipartFile multipartFile) {
        // For theme uploads, use a fixed tenant ID (1) since themes are public
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = "banner_theme_1.jpg";
       
        return s3Service.uploadThemeFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image/jpeg");
    }

    // Novo: upload de banner com accountId no nome do arquivo
    public URI uploadThemeBannerWithAccountId(MultipartFile multipartFile, Long accountId) {
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = "banner_theme_" + accountId + ".jpg";
        return s3Service.uploadThemeFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image/jpeg");
    }
    
    //SERVICE PARA UPLOAD DE FOTO DO CORRETOR
    public URI uploadThemeAgentPhoto(MultipartFile multipartFile) {
        // For theme uploads, use a fixed tenant ID (1) since themes are public
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = "agent_theme_1.jpg";
       
        return s3Service.uploadThemeFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image/jpeg");
    }

    // Novo: upload de foto do corretor com accountId no nome do arquivo
    public URI uploadThemeAgentPhotoWithAccountId(MultipartFile multipartFile, Long accountId) {
        BufferedImage jpgImage = imageService.getJpgImageFromFile(multipartFile);
        String fileName = "agent_theme_" + accountId + ".jpg";
        return s3Service.uploadThemeFile(imageService.getInputStream(jpgImage, "jpg"), fileName, "image/jpeg");
    }
    
    
    public Page<Image> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
    	 UserSS user = UserService.authenticated();
         if (user == null) {
         	throw new AuthorizationException("erro");
         }
         
         	Tenant tenant= tenantService.find(user.getId());
	    	Account account= accountService.find(tenant.getAccount().getId());
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return imageRepository.findPageByAccount(account.getId(),pageRequest);
    }

    
	public void deleteFile(Long id) throws URISyntaxException {		
	     UserSS user = UserService.authenticated();
	        if (user == null) {
	            throw new AuthorizationException("erro");
	        }
	       
	        
	        s3Service.deleteFile(id);
	        
		
	}

}
