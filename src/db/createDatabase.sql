-- Create Database
CREATE DATABASE IF NOT EXISTS ticket_management;

-- Use Database
USE ticket_management;

-- Create Company table
CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Create User table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    role ENUM('normal', 'operator', 'administrator'),
    UNIQUE (email)
);

-- Create Operator table
CREATE TABLE Operator (
    operator_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    user_id INT,
    FOREIGN KEY (company_id) REFERENCES Company(company_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Ticket table
CREATE TABLE Ticket (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    user_id INT,
    subject VARCHAR(255),
    description TEXT,
    priority ENUM('high', 'medium', 'low'),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'in_progress', 'blocked', 'completed'),
    operator_rating INT,
    FOREIGN KEY (company_id) REFERENCES Company(company_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create File table
CREATE TABLE File (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);
