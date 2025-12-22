-- Create Database
CREATE DATABASE IF NOT EXISTS web_lab_db;
USE web_lab_db;

-- Create Users Table (Example)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Data
INSERT INTO users (name, email) VALUES
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com'),
    ('Bob Johnson', 'bob@example.com');

-- Create Students Table (for lab work)
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    semester INT,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Students
INSERT INTO students (student_id, name, department, semester, email) VALUES
    ('S001', 'Alice Brown', 'Computer Science', 5, 'alice@university.edu'),
    ('S002', 'Charlie Davis', 'Information Technology', 6, 'charlie@university.edu'),
    ('S003', 'Diana Evans', 'Software Engineering', 4, 'diana@university.edu');

-- Show Tables
SHOW TABLES;
