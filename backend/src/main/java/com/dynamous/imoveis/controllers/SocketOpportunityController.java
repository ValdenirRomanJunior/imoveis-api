package com.dynamous.imoveis.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller
@RequestMapping(value = "/connect/info")
public class SocketOpportunityController {

 
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String saveHomeSite(@Payload String message ){   	
    	System.out.println(message);
       return "VALDENIR"+message;
    }
    

      
   
   
}
