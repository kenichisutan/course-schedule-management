DROP TABLE IF EXISTS Login;
DROP TABLE IF EXISTS Courses;

CREATE TABLE Login (
	userID INT AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(100), 
    password VARCHAR(200), 
	email VARCHAR(200),
    accountType VARCHAR(20)
);
        
CREATE TABLE Courses (
	semester VARCHAR(20),
	subject VARCHAR(225),
    department VARCHAR(40),
    number VARCHAR(8),
    section VARCHAR(8),
    courseName VARCHAR(255),
    credits INT,
    day VARCHAR(255),
    startTime TIME,
    endTime TIME,
    instructor VARCHAR(255),
    crn VARCHAR(255),
    genEd VARCHAR(255),
    prior VARCHAR(255),
    specialInfo VARCHAR(655),
    PRIMARY KEY (semester, department, number, section)
);