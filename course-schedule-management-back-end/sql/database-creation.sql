DROP TABLE IF EXISTS Login;

CREATE TABLE Login (
	userID INT AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(100), 
    password VARCHAR(200), 
	email VARCHAR(200),
    accountType VARCHAR(20)
);