/* spring 쪽 dummy user */
CREATE TABLE User (
	nickname		  VARCHAR(20) 	    NOT NULL	PRIMARY KEY,
    password		  VARCHAR(20)		NOT NULL,
    email       	  VARCHAR(20)		NOT NULL
);

CREATE TABLE Room (
    roomId          INT             NOT NULL    AUTO_INCREMENT,
    roomName        VARCHAR(20)     NOT NULL,
    nickname        VARCHAR(20)     NOT NULL,
    createdAt       TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(roomId),
    FOREIGN KEY(nickname) references User(nickname) on update cascade
);

CREATE TABLE Chat (
    chatId          INT             NOT NULL    AUTO_INCREMENT,
    roomId          INT             NOT NULL,
    nickname        VARCHAR(20)     NOT NULL,
    content         VARCHAR(200),
    imagePath       VARCHAR(50),    
    createdAt       TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(chatId),
    FOREIGN KEY(roomId) references Room(roomId),
    FOREIGN KEY(nickname) references User(nickname) on update cascade
);

CREATE TABLE Member (
    roomId          INT             NOT NULL,
    nickname        VARCHAR(20)     NOT NULL,
    createdAt       TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(roomId, nickname),
    FOREIGN KEY(roomId) references Room(roomId),
    FOREIGN KEY(nickname) references User(nickname) on update cascade
);