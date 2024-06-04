drop database if exists projetoFiel;
CREATE DATABASE projetoFiel;

USE projetoFiel;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50)
);

CREATE TABLE aviso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(150),
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    qtdPontos INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);




INSERT INTO usuario (nome, email, senha) VALUES ('Alice', 'alice@example.com', 'senha123');
INSERT INTO usuario (nome, email, senha) VALUES ('Bob', 'bob@example.com', 'senha456');
INSERT INTO usuario (nome, email, senha) VALUES ('Carol', 'carol@example.com', 'senha789');


INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('Aviso 1', 'Descrição do aviso 1', 1);
INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('Aviso 2', 'Descrição do aviso 2', 2);
INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('Aviso 3', 'Descrição do aviso 3', 3);
INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('Aviso 4', 'Descrição do aviso 4', 1);


INSERT INTO quiz (qtdPontos, fkUsuario) VALUES (10, 1);
INSERT INTO quiz (qtdPontos, fkUsuario) VALUES (20, 2);
INSERT INTO quiz (qtdPontos, fkUsuario) VALUES (15, 3);
INSERT INTO quiz (qtdPontos, fkUsuario) VALUES (25, 1);

SELECT * FROM usuario;
SELECT * FROM quiz;


-- Select para ver a média geral da pontuação
select avg(qtdPontos) from quiz;


-- Select para ver quantas tentativas
select count(fkUsuario) from quiz where fkusuario = 1;

