
INSERT INTO tenant ( slug, email, password, status,last_name,verification) VALUES ('corretor1','vromanjunior@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir',1);
INSERT INTO tenant ( slug, email, password, status,last_name,verification) VALUES ('corretor2','piagenerator@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1);
INSERT INTO tenant ( slug, email, password, status,last_name,verification) VALUES ('corretor3','piagenerator@uol.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1);

INSERT INTO user_admin ( slug, email, password, status,last_name) VALUES ('Admin','piagenerator2@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir');

INSERT INTO perfis (tenant_id, perfis) VALUES (1,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (2,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (3,2);



INSERT INTO user_admin_perfis (user_admin_id, perfis) VALUES (1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123',1,1);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '0','3323','123',1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123',2,2);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, status_property, tenant_id) VALUES ('casa1','casa linda', 1,2,'1','1', '234', '3323', '4 ou mais','3323','123',1,2);

INSERT INTO state(name) VALUES ('PR');
INSERT INTO city(name,state_id) VALUES ('Toledo',1);
INSERT INTO city(name,state_id) VALUES ('Cascavel',1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '11','cumbuco', '61619015',1,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','cumbuco', '61619015',2,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','cumbuco', '61619015',3,2);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. tabuba', '10','cumbuco', '61619015',4,2);

INSERT INTO image(id, url, id_tenant) VALUES (1,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1.jpg',1);
INSERT INTO image(id, url, id_tenant) VALUES (2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp2.jpg',1);



INSERT INTO urls(id, id_tenant, url,property_id) VALUES (1,1,'https://dynamous.s3.sa-east-1.amazonaws.com/tp14.jpg',1);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (2,1,'https://dynamous.s3.sa-east-1.amazonaws.com/tp14.jpg',2);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (3,2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp14.jpg',3);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (4,2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp14.jpg',4);

INSERT INTO lead(name,email,phone,message,property_id,tenant_id) VALUES ('Jean','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa',1,1);
INSERT INTO lead(name,email,phone,message,property_id,tenant_id) VALUES ('Rafael','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa',2,1);
INSERT INTO lead(name,email,phone,message,property_id,tenant_id) VALUES ('Junior','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa',3,2);






