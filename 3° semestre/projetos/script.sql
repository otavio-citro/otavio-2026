CREATE DATABASE bd_finan_control_3b

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    tipo_acesso VARCHAR(50),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50),
    cor VARCHAR(20),
    icone VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON DELETE CASCADE
);

CREATE TABLE transacoes (
    id_transacoes SERIAL PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_pagamento DATE,
    data_vencimento DATE,
    tipo VARCHAR(50),
    id_categoria INT,
    id_subcategoria INT,
    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON DELETE SET NULL,
    FOREIGN KEY (id_subcategoria)
        REFERENCES subcategorias(id_subcategoria)
        ON DELETE SET NULL
);