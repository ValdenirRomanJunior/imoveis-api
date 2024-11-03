package com.dynamous.imoveis.controllers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.StateDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.services.CityService;
import com.dynamous.imoveis.services.PropertyService;
import com.dynamous.imoveis.services.StateService;
import com.dynamous.imoveis.services.StepService;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import antlr.StringUtils;

@RestController
@RequestMapping(value="/integracoes")
public class IntegracoesController {
	

	
	@GetMapping(value = "/toxml", produces = {"application/xml"})
	public void find(HttpServletResponse response, HttpServletRequest  request) throws IOException{
		
		Property property = new Property();	
			
			property.setId((long) 1);
			property.setName("Jean");
			property.setTenant(property.getTenant());
					
			XStream xStream = new XStream(new DomDriver());
			xStream.alias("property", Property.class);
			
			String xml= xStream.toXML(property);
			
			String contentType= request.getServletContext().getMimeType(xml);
			if(contentType == null) {
			contentType ="application/octet-stream";
		}
			response.setHeader("Content-Disposition", "attachment; filename=\""+ "1.xml");
			response.setCharacterEncoding("UTF-8");
		   response.setHeader("Content-Transfer-Encoding", "binary");
	       response.setContentType("application/xml");
		   response.setContentLength( xml.length());
	        	    
		   IOUtils.copy(IOUtils.toInputStream(xml), response.getOutputStream());	    
		 response.flushBuffer();
		   
		    		    
		    		   		
	}
	

	


}
