
INSERT INTO account ( logo,domain, company_name, cnpj, creci) VALUES ('nenhuma1','localhost1','imobiliariaTeste','434434343','3243-F');
INSERT INTO account ( logo,domain, company_name, cnpj, creci) VALUES ('nenhuma2','localhost','imobiliariaTeste','434434343','3243-F');


INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain,account_id) VALUES ('corretor1','vromanjunior@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir',1,'localhost3',1);
INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain,account_id) VALUES ('corretor2','piagenerator@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1,'localhost2',1);
INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain,account_id) VALUES ('corretor3','piagenerator@uol.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1,'localhost',2);

INSERT INTO user_admin ( slug, email, password, status,last_name) VALUES ('Admin','admin@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir');

INSERT INTO perfis (tenant_id, perfis) VALUES (1,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (2,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (3,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (3,4);

					
INSERT INTO user_admin_perfis (user_admin_id, perfis) VALUES (1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property,status_featured, account_id) VALUES ('casa1 conta1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,1,1);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property,status_featured, account_id) VALUES ('casa2 conta1','casa linda', 1,1, '1','1', '234', '3323', '0','3323','123','23345',1,1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property,status_featured, account_id) VALUES ('casa3 conta2','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,2,2);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property,status_featured, account_id) VALUES ('casa4 conta2','casa linda', 1,2,'1','1', '234', '3323', '4 ou mais','3323','123','23345',1,1,2);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property,status_featured, account_id) VALUES ('casa5 conta2','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,1,2);

INSERT INTO state(name) VALUES ('PR');
INSERT INTO city(name,state_id) VALUES ('Toledo',1);
INSERT INTO city(name,state_id) VALUES ('Cascavel',1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '11','cumbuco', '61619015',1,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','icarai', '61619015',2,1);

INSERT INTO address(street, number, district, cep, property_id, city_id, account_id) VALUES ('Av. Sul', '10','tabuba', '61619015',3,2,2);
INSERT INTO address(street, number, district, cep, property_id, city_id, account_id) VALUES ('Av. tabuba', '10','pancera', '61619015',4,2,2);	
INSERT INTO address(street, number, district, cep, property_id, city_id, account_id) VALUES ('Av. tabuba', '10','coopagro', '61619015',5,1,2);
		
	

INSERT INTO lead(name,email,phone,message,instant,property_id,account_id) VALUES ('Jean da silva de oliveira santos','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',1,1);
INSERT INTO lead(name,email,phone,message,instant,property_id,account_id) VALUES ('Rafael','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',2,1);
INSERT INTO lead(name,email,phone,message,instant,property_id,account_id) VALUES ('Junior','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',3,2);


INSERT INTO step(name,account_id) VALUES ('captura',1);
INSERT INTO step(name,account_id) VALUES ('Em Atendimento',1);
INSERT INTO step(name,account_id) VALUES ('Em Atendimento',2);

	
INSERT INTO opportunity(instant,property_id,step_id,lead_id,account_id) VALUES ('08/05/2024 01:59',1,2,1,1);
INSERT INTO opportunity(instant,property_id,step_id,lead_id,account_id) VALUES ('08/05/2024 01:58',1,3,3,2);


/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (1,1,'https://dynamous.s3.sa-east-1.amazonaws.com/logo-site.png',1);
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (2,1,'https://dynamous.s3.sa-east-1.amazonaws.com/logo-site.png',1)
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (3,1,'https://dynamous.s3.sa-east-1.amazonaws.com/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',3);
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (4,1,'https://dynamous.s3.sa-east-1.amazonaws.com/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',4);*/