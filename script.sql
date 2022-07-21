CREATE DATABASE public;

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    data_cadastro DATE NOT NULL
);

CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL UNIQUE,
    data_cadastro DATE NOT NULL,
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE contato (
    id SERIAL PRIMARY KEY,
    agenda_id INTEGER NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone CHAR(11) NOT NULL UNIQUE,
    whatsapp BOOLEAN NOT NULL,
    email VARCHAR(50) NOT NULL,
    ativo BOOLEAN NOT NULL,
    data_cadastro DATE NOT NULL,
    FOREIGN KEY (agenda_id)
    REFERENCES agenda (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE endereco (
    id SERIAL PRIMARY KEY,
    contato_id INTEGER NOT NULL,
    rua VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero INTEGER NOT NULL,
    uf CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    FOREIGN KEY (contato_id)
    REFERENCES contato (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO public.usuario(
	id,login, password, email,data_cadastro)
	VALUES (1, 'admin', 'senha', 'administrador@email.com', '2022-07-12');

