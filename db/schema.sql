DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

USE calendar;

CREATE TABLE reservations (
  id int NOT NULL AUTO_INCREMENT,
  home_id int NOT NULL,
  num_date int NOT NULL,
  PRIMARY KEY (id)
);
