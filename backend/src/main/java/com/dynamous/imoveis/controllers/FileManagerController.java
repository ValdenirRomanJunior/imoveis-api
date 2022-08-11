package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.services.FileManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequestMapping(value = "/pictures")
public class FileManagerController {

    @Autowired
    private FileManagerService service;

    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping
    public ResponseEntity<Void> uploadPropertyPictures(@RequestParam(name="file") MultipartFile file){
        URI uri = service.uploadPropertyPictures(file);
        return ResponseEntity.created(uri).build();
    }
}
