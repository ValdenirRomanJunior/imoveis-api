
INSERT INTO tenant ( slug, email, password, status,last_name) VALUES ('corretor1','vromanjunior@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'valdenir');
INSERT INTO tenant ( slug, email, password, status,last_name) VALUES ('corretor2','piagenerator@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1,'jean');

INSERT INTO tenant_customer ( name, email, password, tenant_id) VALUES ('cliente-corretor2','cliente1@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',1);
INSERT INTO tenant_customer ( name, email, password, tenant_id) VALUES ('cliente-corretor1','cliente2@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa',2);

INSERT INTO user_admin ( email, password) VALUES ('piagenerator2@outlook.com','$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa');

INSERT INTO perfis (tenant_id, perfis) VALUES (1,2);
INSERT INTO perfis (tenant_id, perfis) VALUES (2,2);

INSERT INTO customer_perfis (tenant_customer_id, perfis) VALUES (1,3);
INSERT INTO customer_perfis (tenant_customer_id, perfis) VALUES (2,3);

INSERT INTO user_admin_perfis (user_admin_id, perfis) VALUES (1,1);

INSERT INTO property (name, description, type, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '2332','3323','123',1);
INSERT INTO property (name, description, type, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '2332','3323','123',1);
INSERT INTO property (name, description, type, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, tenant_id) VALUES ('casa1','casa linda', 1,1, '1','1', '234', '3323', '2332','3323','123',2);
INSERT INTO property (name, description, type, goal,number_rooms, bath_rooms,area, iptu, vacancies, condominium, price, tenant_id) VALUES ('casa1','casa linda', 1,1,'1','1', '234', '3323', '2332','3323','123',2);

INSERT INTO state(name) VALUES ('PR');
INSERT INTO city(name,state_id) VALUES ('Toledo',1);
INSERT INTO city(name,state_id) VALUES ('Cascavel',1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '11','cumbuco', '61619015',1,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','cumbuco', '61619015',2,1);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. Sul', '10','cumbuco', '61619015',3,2);
INSERT INTO address(street, number, district, cep, property_id, city_id) VALUES ('Av. tabuba', '10','cumbuco', '61619015',4,2);

INSERT INTO image(id, url, id_tenant) VALUES (1,'https://dynamous.s3.sa-east-1.amazonaws.com/1000_F_444090098_XSS1MaKnXeEkgXdfDTD3ODyNOpclDtsx.jpg',1);
INSERT INTO image(id, url, id_tenant) VALUES (2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1jpg',1);


INSERT INTO urls(id, id_tenant, url,property_id) VALUES (1,1,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1jpg',1);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (2,1,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1jpg',2);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (3,2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1jpg',3);
INSERT INTO urls(id, id_tenant, url,property_id) VALUES (4,2,'https://dynamous.s3.sa-east-1.amazonaws.com/tp1jpg',4);








