package com.dynamous.imoveis.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RegistrationEmailTemplateController {
	
	@RequestMapping("/templateemail")
	public ModelAndView getTemplate() {
		return new ModelAndView("email/newPasswordTenantEmail");
	}

}
