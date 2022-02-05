CREATE DATABASE NOT EXISTS 845MbAxvZz;

USE 845MbAxvZz;

CREATE TABLE IF NOT EXISTS buyers(
    userrid INT AUTO_INCREMENT NOT NULL,
    fname varchar(255),
    lname varchar(255),
    phonenumberr INT NOT null,
    emaill varchar(255) NOT NULL UNIQUE,
    passwordd varchar(255)NOT NUll,
    typee int2 default 0,
    PRIMARY KEY (userrid)
);


CREATE TABLE IF NOT EXISTS sellers(
    sellerid INT AUTO_INCREMENT NOT NULL,
    sellername varchar(255) NOT NULL,
    emaill varchar(255) NOT NULL UNIQUE,
    phonenumberr INT NOT null,
    titlee varchar(255) NOT NULL,
    informationn varchar(255) NOT NULL,
    passwordd varchar(255)NOT NUll,
    price INT NOT NULL,
    typee int2 default 1,
    country varchar(255) NOT NULL,
    PRIMARY KEY (sellerid)
);

CREATE TABLE IF NOT EXISTS Appointments(
   id INT AUTO_INCREMENT NOT NULL,
   dates DATETIME DEFAULT CURRENT_TIMESTAMP,
   statuss INT default 0,
   buyerid INT default NULL,
   sellerrid INT,
   FOREIGN KEY (buyerid) REFERENCES buyers(userrid),
   FOREIGN KEY (sellerrid) REFERENCES sellers(sellerid),
   PRIMARY KEY (id)
);