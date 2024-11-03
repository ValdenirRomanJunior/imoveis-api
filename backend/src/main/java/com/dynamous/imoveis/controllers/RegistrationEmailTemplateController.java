package com.dynamous.imoveis.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RegistrationEmailTemplateController {
	
	@RequestMapping(value="/templateemail", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ModelAndView getTemplate() {
		return new ModelAndView("email/newPasswordTenantEmail");
	}

}
