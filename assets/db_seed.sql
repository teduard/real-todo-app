CREATE TABLE items (
    ID SERIAL PRIMARY KEY,
    userId int NOT NULL,
    todo text NOT NULL,
    description TEXT NOT NULL,
    status varchar(255) NOT NULL
);

CREATE TABLE settings (
    ID SERIAL PRIMARY KEY,
    userId int NOT NULL,
    language varchar(255) NOT NULL,
    timezone varchar(255) NOT NULL
);