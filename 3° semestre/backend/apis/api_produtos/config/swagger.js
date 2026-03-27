const documentacao = {
openapi: "3.0.3",
info: {
title: 'API Ordem de serviços',
description: 'Documentação da API de ordens de serviço',
version: '1.0.0'
},
servers: [
{
url: 'http://localhost:3001',
description: 'localhost'
}
],
tags: [
{ name: 'Usuários', description: 'operações relacionadas aos usuários' },
{ name: 'Produtos', description: 'operações relacionadas aos produtos' }
],
paths: {

    "/usuarios": {
        get: {
            tags: ["Usuários"],
            summary: "Listar usuários",
            responses: {
                200: {
                    description: "Dados obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Lista_Usuarios" }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Usuários'],
            summary: 'Cadastrar novo usuário',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Cadastro_Usuario' }
                    }
                }
            },
            responses: {
                201: { description: "Usuário cadastrado com sucesso" },
                400: { description: 'Erro na requisição' },
                500: { description: 'Erro interno no servidor' }
            }
        }
    },

    "/usuarios/{id_usuario}": {
        put: {
            tags: ["Usuários"],
            summary: "Atualizar usuário completo",
            parameters: [
                {
                    name: "id_usuario",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: '#/components/schemas/Atualizacao_Usuario' }
                    }
                }
            },
            responses: {
                200: { description: "Usuário atualizado" },
                404: { description: "Usuário não encontrado" }
            }
        },

        patch: {
            tags: ["Usuários"],
            summary: "Atualizar usuário parcialmente",
            parameters: [
                {
                    name: "id_usuario",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    example: 1
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: '#/components/schemas/Atualizacao_Parcial_Usuario' },
                        examples: {
                            apenas_nome: {
                                value: { nome: "Novo Nome" }
                            },
                            apenas_email: {
                                value: { email: "novo@email.com" }
                            },
                            apenas_senha: {
                                value: { senha: "novaSenha123" }
                            },
                            nome_email: {
                                value: { nome: "João", email: "joao@email.com" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Usuário atualizado" },
                400: { description: "Nenhum campo enviado" },
                404: { description: "Usuário não encontrado" }
            }
        },

        delete: {
            tags: ["Usuários"],
            summary: "Remover usuário",
            parameters: [
                {
                    name: "id_usuario",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                200: { description: "Usuário removido" }
            }
        }
    },

    "/login": {
        post: {
            tags: ['Usuários'],
            summary: 'realizar login',
            description: 'autentica um usuario e retorna seus dados',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Login_Usuario' }
                    }
                }
            },
            responses: {
                200: {
                    description: "login realizado com sucesso!",
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Resposta_Login' }
                        }
                    }
                },
                400: { description: 'Erro na requisição' },
                500: { description: 'Erro interno no servidor' }
            }
        }
    },

    "/produtos": {
        get: {
            tags: ["Produtos"],
            summary: "Listar produtos",
            responses: {
                200: {
                    description: "Dados obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Lista_Produtos" }
                            }
                        }
                    }
                }
            }
        },

        post: {
            tags: ['Produtos'],
            summary: 'Cadastrar produto',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Cadastro_Produto' }
                    }
                }
            },
            responses: {
                201: { description: "Produto cadastrado" },
                400: { description: 'Erro na requisição' },
                500: { description: 'Erro interno' }
            }
        }
    },

    "/produtos/{id_produto}": {
        put: {
            tags: ["Produtos"],
            summary: "Atualizar produto completo",
            parameters: [
                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: '#/components/schemas/Atualizacao_Produto' }
                    }
                }
            },
            responses: {
                200: { description: "Produto atualizado" },
                404: { description: "Produto não encontrado" }
            }
        },

        patch: {
            tags: ["Produtos"],
            summary: "Atualizar produto parcialmente",
            parameters: [
                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    example: 1
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: '#/components/schemas/Atualizacao_Parcial_Produto' },
                        examples: {
                            apenas_nome: {
                                value: { nome: "Teclado Gamer" }
                            },
                            apenas_preco: {
                                value: { preco: 199.90 }
                            },
                            apenas_categoria: {
                                value: { categoria: "Periféricos" }
                            },
                            frete: {
                                value: { frete: false }
                            },
                            completo: {
                                value: {
                                    nome: "Mouse RGB",
                                    preco: 149.90,
                                    categoria: "Periféricos"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Produto atualizado" },
                400: { description: "Nenhum campo enviado" },
                404: { description: "Produto não encontrado" }
            }
        },

        delete: {
            tags: ["Produtos"],
            summary: "Remover produto",
            parameters: [
                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                200: { description: "Produto removido" }
            }
        }
    }
},

components: {
    schemas: {

        Lista_Usuarios: {
            type: "object",
            properties: {
                id_usuario: { type: "integer", example: 1 },
                nome: { type: "string", example: "João" },
                email: { type: "string", example: "joao@email.com" }
            }
        },

        Cadastro_Usuario: {
            type: "object",
            required: ["nome", "email", "senha"],
            properties: {
                nome: { type: "string" },
                email: { type: "string" },
                senha: { type: "string" }
            }
        },

        Atualizacao_Usuario: {
            type: "object",
            required: ["nome", "email", "senha"],
            properties: {
                nome: { type: "string" },
                email: { type: "string" },
                senha: { type: "string" }
            }
        },

        Atualizacao_Parcial_Usuario: {
            type: "object",
            properties: {
                nome: { type: "string" },
                email: { type: "string" },
                senha: { type: "string" }
            }
        },

        Lista_Produtos: {
            type: "object",
            properties: {
                id_produto: { type: "integer", example: 1 },
                nome: { type: "string", example: "Mouse Gamer" },
                preco: { type: "number", example: 99.90 },
                link_produto: { type: "string" },
                link_imagem: { type: "string" },
                categoria: { type: "string" },
                frete: { type: "boolean", example: false }
            }
        },

        Cadastro_Produto: {
            type: "object",
            required: ["nome", "preco"],
            properties: {
                nome: { type: "string" },
                preco: { type: "number" },
                link_produto: { type: "string" },
                link_imagem: { type: "string" },
                categoria: { type: "string" },
                frete: { type: "boolean", example: false }
            }
        },

        Atualizacao_Produto: {
            type: "object",
            required: ["nome", "preco"],
            properties: {
                nome: { type: "string" },
                preco: { type: "number" },
                link_produto: { type: "string" },
                link_imagem: { type: "string" },
                categoria: { type: "string" },
                frete: { type: "boolean", example: false }
            }
        },

        Atualizacao_Parcial_Produto: {
            type: "object",
            properties: {
                nome: { type: "string" },
                preco: { type: "number" },
                link_produto: { type: "string" },
                link_imagem: { type: "string" },
                categoria: { type: "string" },
                frete: { type: "boolean", example: false }
            }
        },

        Login_Usuario: {
            type: "object",
            required: ["email", "senha"],
            properties: {
                email: { type: "string", example: 'ricardo@gmail.com' },
                senha: { type: "string", example: 'senha123' }
            }
        },

        Resposta_Login: {
            type: "object",
            properties: {
                message: { type: 'string', example: 'Login realizado com sucesso' },
                usuario: {
                    type: 'object',
                    properties: {
                        id_usuario: { type: 'integer', example: 1 },
                        email: { type: "string", example: 'ricardo@gmail.com' },
                        senha: { type: "string", example: 'senha123' }
                    }
                }
            }
        }
    }
}

}

export default documentacao