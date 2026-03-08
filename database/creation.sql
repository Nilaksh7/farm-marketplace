-- ============================
-- DATABASE
-- ============================

CREATE DATABASE marketplacedb2;
USE marketplacedb2;


-- ============================
-- USERS
-- ============================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    role ENUM('BUYER','FARMER') DEFAULT 'BUYER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- ============================
-- FARMERS
-- ============================

CREATE TABLE farmers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    farm_name VARCHAR(255) DEFAULT 'My Farm',
    rating FLOAT DEFAULT 0,
    total_sales INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- ============================
-- BUYERS
-- ============================

CREATE TABLE buyers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- ============================
-- PRODUCTS
-- ============================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    average_rating FLOAT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);


-- ============================
-- CART
-- ============================

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- ============================
-- CHECKOUT
-- ============================

CREATE TABLE checkout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    grand_total FLOAT NOT NULL,
    delivery_fee FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);


-- ============================
-- ORDERS
-- ============================

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount FLOAT NOT NULL,
    delivery_address VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    checkout_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (checkout_id) REFERENCES checkout(id)
);


-- ============================
-- ORDER ITEMS
-- ============================

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    delivery_status ENUM('pending','shipped','delivered') DEFAULT 'pending',
    delivered_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- ============================
-- PAYOUTS
-- ============================

CREATE TABLE payouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    order_item_id INT NOT NULL,
    amount FLOAT NOT NULL,
    status ENUM('pending','transferred') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (order_item_id) REFERENCES order_items(id)
);


-- ============================
-- PAYMENTS
-- ============================

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkout_id INT NOT NULL,
    payer_id INT NOT NULL,
    amount FLOAT NOT NULL,
    method VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    gateway_transaction_id VARCHAR(255),
    paid_at DATETIME,
    gateway_response JSON,
    FOREIGN KEY (checkout_id) REFERENCES checkout(id),
    FOREIGN KEY (payer_id) REFERENCES users(id)
);


-- ============================
-- REVIEWS
-- ============================

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id INT NOT NULL,
    product_id INT,
    order_id INT,
    rating INT,
    title VARCHAR(255),
    comment TEXT,
    is_verified_purchase BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
INSERT INTO users(name,email,password,role)
VALUES('Farmer1','farmer@test.com','123456','FARMER');
INSERT INTO farmers(user_id,farm_name)
VALUES(1,'Green Farm');
INSERT INTO products(farmer_id,name,description,price,stock_quantity)
VALUES(1,'Tomatoes','Fresh organic tomatoes',40,100);

ALTER TABLE products ADD COLUMN image_url VARCHAR(500);
UPDATE products
SET image_url='https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'
WHERE id=1;

DESCRIBE products;
ALTER TABLE products
ADD COLUMN category VARCHAR(50);

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart;
TRUNCATE TABLE products;
TRUNCATE TABLE farmers;
TRUNCATE TABLE buyers;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

