--Create or recreate database if exists
DROP DATABASE IF EXISTS user_system;
CREATE DATABASE user_system;
USE user_system;

-- Create movie table
CREATE TABLE users (
    user_id  INT IDENTITY(1,1)  NOT NULL,
    full_name    VARCHAR(255) NOT NULL,
    username     VARCHAR(255) NOT NULL,
    password   VARCHAR(255)  NOT NULL,
    PRIMARY KEY (user_id)
);


