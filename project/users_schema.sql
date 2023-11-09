--Create or recreate database if exists
DROP DATABASE IF EXISTS user_system;
CREATE DATABASE user_system;
USE user_system;

-- Create users table
CREATE TABLE users (
    user_id  INT IDENTITY(1,1)  NOT NULL,
    full_name    VARCHAR(255) NOT NULL,
    country_id   INT    NOT NULL,
    username     VARCHAR(255) NOT NULL,
    password   VARCHAR(255)  NOT NULL,
    PRIMARY KEY (user_id)
);
-- Create posts table
CREATE TABLE posts (
    subject  VARCHAR(255) NOT NULL,
    info     VARCHAR(255) NOT NULL,
    instructions VARCHAR(255) NOT NULL,
    post_id     INT IDENTITY(1,1) NOT NULL,
    date    DATE    NOT NULL,
    PRIMARY KEY (post_id)
);


