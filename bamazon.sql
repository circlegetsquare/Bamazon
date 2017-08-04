DROP DATABASE IF EXISTS top_songsDB;

CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE top5000 (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  Total DECIMAL(10,3) NULL,
  USA DECIMAL(10,3) NULL,
  UK DECIMAL(10,3) NULL,
  EUR DECIMAL(10,3) NULL,
  GLO DECIMAL(10,3) NULL,
  PRIMARY KEY (position)
);