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

-- caso a tabela precise de ativo
 ALTER TABLE transacoes ADD COLUMN ativo BOOLEAN DEFAULT true;




-- mais recente ⬇️

-- create database bd_finan_control_3b

-- CREATE TABLE usuarios (
--     id_usuario SERIAL PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     senha VARCHAR(255) NOT NULL,
--     nome VARCHAR(150) NOT NULL,
--     tipo_acesso VARCHAR(50),
--     ativo BOOLEAN DEFAULT TRUE
-- );

-- CREATE TABLE categorias (
--     id_categoria SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     descricao TEXT,
--     tipo VARCHAR(50),
--     cor VARCHAR(20),
--     icone VARCHAR(100),
--     ativo BOOLEAN DEFAULT TRUE
-- );

-- CREATE TABLE subcategorias (
--     id_subcategoria SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     ativo BOOLEAN DEFAULT TRUE,
--     id_categoria INT NOT NULL,
--     FOREIGN KEY (id_categoria)
--         REFERENCES categorias(id_categoria)
--         ON DELETE CASCADE
-- );

-- CREATE TABLE transacoes (
--     id_transacoes SERIAL PRIMARY KEY,
--     valor DECIMAL(10,2) NOT NULL,
--     descricao TEXT,
--     data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     data_pagamento DATE,
--     data_vencimento DATE,
--     tipo VARCHAR(50),
--     id_categoria INT,
--     id_subcategoria INT,
--     FOREIGN KEY (id_categoria)
--         REFERENCES categorias(id_categoria)
--         ON DELETE SET NULL,
--     FOREIGN KEY (id_subcategoria)
--         REFERENCES subcategorias(id_subcategoria)
--         ON DELETE SET NULL
-- );

-- SELECT * FROM usuarios ORDER BY id_usuario

-- SELECT * FROM usuarios where ativo = true ORDER BY id_usuario

-- drop from usuarios where id_usuario = 1

-- select * from transacoes
-- ALTER TABLE transacoes ADD COLUMN ativo BOOLEAN DEFAULT true
-- ALTER TABLE transacoes
-- DROP COLUMN ativo;


-- SELECT 
--         t.id_transacoes,
--         t.valor,
--         t.descricao,
--         TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
--         TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
--         TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
--         t.tipo,
--         c.nome AS categoria,
--         s.nome AS subcategoria
--     FROM transacoes t
--     LEFT JOIN categorias c
--         ON t.id_categoria = c.id_categoria
--     LEFT JOIN subcategorias s
--         ON t.id_subcategoria = s.id_subcategoria
--     ORDER BY t.id_transacoes


-- 	SELECT 
--                 t.id_transacoes,
--                 t.valor,
--                 t.descricao,
--                 TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
--                 TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
--                 TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
--                 t.tipo,
--                 c.nome AS categoria,
--                 s.nome AS subcategoria
--             FROM transacoes t
--             LEFT JOIN categorias c
--                 ON t.id_categoria = c.id_categoria
--             LEFT JOIN subcategorias s
--                 ON t.id_subcategoria = s.id_subcategoria
--             WHERE t.tipo = 'saida'
--             ORDER BY t.id_transacoes

-- 			SELECT 
--                 t.id_transacoes,
--                 t.valor,
--                 t.descricao,
--                 TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
--                 TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
--                 TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
--                 t.tipo,
--                 c.nome AS categoria,
--                 s.nome AS subcategoria
--             FROM transacoes t
--             LEFT JOIN categorias c
--                 ON t.id_categoria = c.id_categoria
--             LEFT JOIN subcategorias s
--                 ON t.id_subcategoria = s.id_subcategoria
--             WHERE t.id_categoria = 1   
--             ORDER BY t.id_transacoes

-- 			SELECT 
--                 t.id_transacoes,
--                 t.valor,
--                 t.descricao,
--                 TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
--                 TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
--                 TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
--                 t.tipo,
--                 c.nome AS categoria,
--                 s.nome AS subcategoria
--             FROM transacoes t
--             LEFT JOIN categorias c
--                 ON t.id_categoria = c.id_categoria
--             LEFT JOIN subcategorias s
--                 ON t.id_subcategoria = s.id_subcategoria
--             WHERE t.id_subcategoria = 1
--             ORDER BY t.id_transacoes