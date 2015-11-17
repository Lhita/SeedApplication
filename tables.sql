DROP TABLE IF EXISTS `employees`;
CREATE TABLE  employees(
	employee_id int NOT NULL AUTO_INCREMENT, 
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	primary key(employee_id)
	
	);

DROP TABLE IF EXISTS `products`;
CREATE TABLE products (
	product_id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	primary key(product_id)
	
	);

DROP TABLE IF EXISTS 'hair_styles';
CREATE TABLE hair_styles (
	style_id int NOT NULL AUTO_INCREMENT,
	style_name VARCHAR(50) NOT NULL,
	price int,
	primary key(style_id),
	foreign key(product_id)
	
	);