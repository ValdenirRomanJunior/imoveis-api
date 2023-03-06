package com.dynamous.imoveis.services;

import com.dynamous.imoveis.services.exceptions.FileException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ImageService {

    //VERIFICA SE É PNG OU JPG
    public BufferedImage getJpgImageFromFile(MultipartFile uploadfile){
    	
    	
        String ext = FilenameUtils.getExtension(uploadfile.getOriginalFilename());
       
        if(!"png".equals(ext) && !"jpeg".equals(ext)){
            throw new FileException("Somente imagens PNG e JPG são permitidos");
        }

        try {
            BufferedImage img = ImageIO.read(uploadfile.getInputStream());
            if("image/png".equals(ext)){
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
    
    //metodo para buscar todas imagens de cada cliente
}
