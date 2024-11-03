
INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain) VALUES ('corretor1','vromanjunior@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir',1,'localhost');
INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain) VALUES ('corretor2','piagenerator@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1,'localhost2');
INSERT INTO TENANT ( slug, email, password, status,last_name,verification, domain) VALUES ('corretor3','piagenerator@uol.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean',1,'localhost3');

INSERT INTO user_admin ( slug, email, password, status,last_name) VALUES ('Admin','admin@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir');

INSERT INTO perfis (tenant_id, perfis) VALUES (1,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (2,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (3,2);



INSERT INTO user_admin_perfis (user_admin_id, perfis) VALUES (1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,1);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '0','3323','123','23345',1,1);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,1);
INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property, tenant_id) VALUES ('casa1','casa linda', 1,2,'1','1', '234', '3323', '4 ou mais','3323','123','23345',1,2);

INSERT INTO property (name, description, type_property, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, area_total, status_property, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '1','3323','123','23345',1,2);

INSERT INTO state(name) VALUES ('PR');
INSERT INTO city(name,state_id) VALUES ('Toledo',1);
INSERT INTO city(name,state_id) VALUES ('Cascavel',1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '11','cumbuco', '61619015',1,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','icarai', '61619015',2,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','tabuba', '61619015',3,2);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. tabuba', '10','pancera', '61619015',4,2);


INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. tabuba', '10','coopagro', '61619015',5,1);



INSERT INTO lead(name,email,phone,message,instant,property_id,tenant_id) VALUES ('Jean da silva de oliveira santos','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',1,1);
INSERT INTO lead(name,email,phone,message,instant,property_id,tenant_id) VALUES ('Rafael','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',2,1);
INSERT INTO lead(name,email,phone,message,instant,property_id,tenant_id) VALUES ('Junior','vromanjunior@outlook.com','85982251426','ola gostarias de saber mais sobre a casa','08/05/2024 01:59',3,2);


INSERT INTO step(name,tenant_id) VALUES ('captura',1);
INSERT INTO step(name,tenant_id) VALUES ('Em Atendimento',1);

INSERT INTO opportunity(instant,property_id,step_id,lead_id,tenant_id) VALUES ('08/05/2024 01:59',1,2,1,1);
INSERT INTO opportunity(instant,property_id,step_id,lead_id,tenant_id) VALUES ('08/05/2024 01:58',1,2,2,1);


/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (1,1,'https://instagram.ftow5-1.fna.fbcdn.net/v/t39.30808-6/459537223_18017388389572518_7821219307249041506_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.ftow5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=VFL6UTfPBfsQ7kNvgGz9gbQ&_nc_gid=ed05d64e579b488f96049f50292511cf&edm=ALQROFkAAAAA&ccb=7-5&ig_cache_key=MzQ1NDk0NjIyMjUzNTI1Mjg1Ng%3D%3D.3-ccb7-5&oh=00_AYBhBkclkiwHAyi3NyTggG9ePVFuSqYMYQDiasXQ1cGG0Q&oe=672B0023&_nc_sid=fc8dfb',1);*/
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (2,1,'https://dynamous.s3.sa-east-1.amazonaws.com/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',2);
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (3,1,'https://dynamous.s3.sa-east-1.amazonaws.com/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',3);
/*INSERT INTO urls(id, id_tenant, url,property_id) VALUES (4,1,'https://dynamous.s3.sa-east-1.amazonaws.com/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',4);*/






