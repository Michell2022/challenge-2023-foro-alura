CREATE TABLE topics (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(255) NOT NULL,
    MESSAGE TEXT NOT NULL,
    SOLVED BOOLEAN NOT NULL,
    CREATED_AT DATETIME NOT NULL,
    USER_ID INT,
    COURSE_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES users(ID),
    FOREIGN KEY (COURSE_ID) REFERENCES courses(ID)
);