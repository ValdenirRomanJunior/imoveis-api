INSERT INTO tb_property(title, price, image, beds, baths, built) VALUES ('title 1', 2500,'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg',1,2,2001);
INSERT INTO tb_state(name) VALUES ('maria');
INSERT INTO tb_county( state_id, name) VALUES (1,'oregon');
INSERT INTO tb_city( county_id, name) VALUES (1, 'litle rock');
INSERT INTO tb_address(street, number, city_id, property_id) VALUES ('st ht2', 234, 1 ,1);
