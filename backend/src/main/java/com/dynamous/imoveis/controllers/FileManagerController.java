package com.dynamous.imoveis.controllers;


import com.dynamous.imoveis.entities.Image;

import com.dynamous.imoveis.services.FileManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value ="/pictures", produces = {MediaType.APPLICATION_JSON_VALUE})
public class FileManagerController {

    @Autowired
    private FileManagerService service;

    
 //   @PostMapping(value="/save")
   // public ResponseEntity<Void> uploadPropertyPictures(@RequestParam(name="file") MultipartFile file){
    	
       // URI uri = service.uploadPropertyPictures(file);
       // return ResponseEntity.created(uri).build();
    //}
    
    @PostMapping(value="/save/profile")
    public ResponseEntity<Void> uploadProfilePictures(@RequestParam(name="file") MultipartFile file){
        URI uri = service.uploadProfilePictures(file);
        return ResponseEntity.created(uri).build();
    }
    
    @GetMapping(value ="/images", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity <Page<Image>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "id")String orderBy,
            @RequestParam(value = "direction",defaultValue = "DESC")  String direction){
        Page<Image> list=service.findPage(page,linesPerPage,orderBy,direction);
        return ResponseEntity.ok().body(list);
    }
    
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id) throws URISyntaxException{
        service.deleteFile(id);
        return ResponseEntity.noContent().build();
    }
}
