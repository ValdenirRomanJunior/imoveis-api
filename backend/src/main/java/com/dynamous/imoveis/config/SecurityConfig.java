package com.dynamous.imoveis.config;

import java.util.Arrays;

import com.dynamous.imoveis.security.JWTAuthenticationFilter;
import com.dynamous.imoveis.security.JWTAuthorizationFilter;
import com.dynamous.imoveis.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private Environment env;

	@Autowired
	private JWTUtil jwtUtil;

	private static final String[] PUBLIC_MATCHERS = {
			"/h2-console/**",
			"/properties/**",
			"/pictures/**",
			"/properties/find/**",
			"/properties/update/**",
			"/auth/forgot/**",
			"/properties/totalProperties/**",
			"/verification/**",
			"/leads/**",
			"/properties/delete/**"
			
			
			
				
			
	};

	private static final String[] PUBLIC_MATCHERS_GET = {		
			"/templateemail/**",		
			"/states/**",
			"/properties/**",
			"/properties/totalProperties/**"
			
			
			
		

	};
	private static final String[] PUBLIC_MATCHERS_POST = {
			
			"/auth/forgot/**"

	};



	@Override
	protected void configure(HttpSecurity http) throws Exception {
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}

		http.cors().and().csrf().disable();
		http.authorizeRequests()
				.antMatchers(PUBLIC_MATCHERS).permitAll()
				.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
				//.antMatchers(HttpMethod.GET,"/images/").permitAll()
				//.antMatchers(HttpMethod.GET,"/images/**").permitAll()
				.anyRequest().authenticated();
		    http.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtUtil));
			http.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtUtil, userDetailsService));
		    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST","PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedOrigins(Arrays.asList("*"));
		
		   configuration.addAllowedOrigin("*");
	        configuration.addAllowedHeader("*");
	        configuration.addAllowedMethod("*");
		
		
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder(){		
		return new BCryptPasswordEncoder();
	}
	
	 public void addResourceHandlers(ResourceHandlerRegistry registry) {
 registry.addResourceHandler("/webjars/**", "/resources/**", "/static/**", "/images/**", "/css/**", "/js/**",
					"classpath:/static/", "classpath:/resources/")
			.addResourceLocations("/webjars/", "/resources/",
							"classpath:/static/**", "classpath:/static/img/**", "classpath:/static/",
							"classpath:/resources/", "classpath:/static/css/", "classpath:/static/js/", "/resources/**",
							"/WEB-INF/classes/static/**");
	 		
   
	
}
	  //@Override
	//public void configure(WebSecurity web) throws Exception {
	//	  web.ignoring().antMatchers(HttpMethod.GET,"/resources/**","static/**","/**");
	//}
}