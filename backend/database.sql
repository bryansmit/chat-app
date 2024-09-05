create table messages
(
    id          int          NOT NULL AUTO_INCREMENT,
    sender_name VARCHAR(255) NOT NULL,
    message     TEXT         NOT NULL,
    sent_at     timestamp    NOT NULL,
    PRIMARY KEY (id)
);