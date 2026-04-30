const documentacao = {
  openapi: "3.0.3",
  info: {
    title: "API Usuarios",
    description: "Documentação da API de usuários",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "localhost"
    }
  ],
  tags: [
    { name: "Usuários", description: "operações relacionadas aos usuários" },
    { name: "Categorias", description: "operações relacionadas as categorias" },
    { name: "Subcategorias", description: "operações relacionadas as subcategorias" },
    { name: "Transacoes", description: "operações relacionadas as transacoes" }
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar usuários",
        security: [
          {bearerAuth: []}
        ],
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
        tags: ["Usuários"],
        summary: "Cadastrar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Usuario" }
            }
          }
        },
        responses: {
          201: { description: "Usuário cadastrado com sucesso" },
          400: { description: "Erro na requisição" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },

    "/usuarios/{id_usuario}": {
      put: {
        tags: ["Usuários"],
        summary: "Atualizar usuário completo",
        security: [
          {bearerAuth: []}
        ],
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
              schema: { $ref: "#/components/schemas/Atualizacao_Usuario" }
            }
          }
        },
        responses: {
          200: { description: "Usuário atualizado" },
          404: { description: "Usuário não encontrado" }
        }
      },

      delete: {
        tags: ["Usuários"],
        summary: "Remover usuário",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Usuário removido com sucesso" }
        }
      }
    },

    "/login": {
      post: {
        tags: ["Usuários"],
        summary: "Realizar login",
        description: "Autentica um usuário e retorna seus dados",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Login_Usuario" }
            }
          }
        },
        responses: {
          200: {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resposta_Login" }
              }
            }
          },
          400: { description: "Erro na requisição" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/categorias": {
      get: {
        tags: ["Categorias"],
        summary: "Listar categorias",
        security: [
          {bearerAuth: []}
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Categorias" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Categorias"],
        summary: "Cadastrar nova categoria",
        security: [
          {bearerAuth: []}
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Categorias" }
            }
          }
        },
        responses: {
          201: { description: "Categoria cadastrada com sucesso" },
          400: { description: "Erro na requisição" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/categorias/{id_categoria}": {
      put: {
        tags: ["Categorias"],
        summary: "Atualizar a categoria completo",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizacao_Categoria" }
            }
          }
        },
        responses: {
          200: { description: "Categoria atualizado" },
          404: { description: "Categoria não encontrado" }
        }
      },
      delete: {
        tags: ["Categorias"],
        summary: "Remover categoria",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Categoria removido com sucesso" }
        }
      }
    },
    "/subcategorias": {
      get: {
        tags: ["Subcategorias"],
        summary: "Listar subcategorias",
        security: [
          {bearerAuth: []}
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Subcategorias" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Subcategorias"],
        summary: "Cadastrar nova subcategoria",
        security: [
          {bearerAuth: []}
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Subcategorias" }
            }
          }
        },
        responses: {
          201: { description: "Subcategoria cadastrada com sucesso" },
          400: { description: "Erro na requisição" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/subcategorias/{id_subcategoria}": {
      put: {
        tags: ["Subcategorias"],
        summary: "Atualizar a subcategoria completo",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizacao_Subcategoria" }
            }
          }
        },
        responses: {
          200: { description: "Subcategoria atualizado" },
          404: { description: "Subcategoria não encontrado" }
        }
      },
      delete: {
        tags: ["Subcategorias"],
        summary: "Remover subcategoria",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Subcategoria removido com sucesso" }
        }
      }
    },
    "/transacoes": {
      get: {
        tags: ["Transacoes"],
        summary: "Listar todos as transacoes",
        security: [
          {bearerAuth: []}
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Transacoes" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Transacoes"],
        summary: "Cadastrar uma nova transacao",
        security: [
          {bearerAuth: []}
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Transacoes" }
            }
          }
        },
        responses: {
          201: { description: "Transacoes cadastrada com sucesso" },
          400: { description: "Erro na requisição" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/transacoes/{id_transacoes}": {
      put: {
        tags: ["Transacoes"],
        summary: "Atualizar a transacoes completo",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_transacoes",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizacao_Transacoes" }
            }
          }
        },
        responses: {
          200: { description: "Transacoes atualizado" },
          404: { description: "Transacoes não encontrado" }
        }
      },
      delete: {
        tags: ["Transacoes"],
        summary: "Remover transacoes",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_transacoes",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Transacoes removido com sucesso" }
        }
      }
    },
    "/transacoes/tipo/{tipo}": {
      get: {
        tags: ["Transacoes"],
        summary: "Listar todos as transacoes",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: 'tipo',
            in: 'path',
            required: true,
            description: 'Tipo transacao (entrada(E) / saida(S))',
            schema: {type: 'string', enum:['E', 'S'], example: "S"}
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Transacoes" }
                }
              }
            }
          }
        }
      }
    },
    "/transacoes/categoria/{id_categoria}": {
      get: {
        tags: ["Transacoes"],
        summary: "Listar transacoes",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "categoria transacoes",
            schema: {type: 'integer', example: 1}
          }
        ],
        responses: {
          200: {
            description: "Lista de transacoes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Transacao" }
                }
              }
            }
          }
        }
      },
    },
    "/transacoes/subcategoria/{id_subcategoria}": {
      get: {
        tags: ["Transacoes"],
        summary: "Listar transacoes",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            description: "SubCategoria transação",
            schema: {type: 'integer', example: 1}
          }
        ],
        responses: {
          200: {
            description: "Lista de transacoes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Transacao" }
                }
              }
            }
          }
        }
      },
    },
    "/transacoes/periodo": {
      get: {
        tags: ["Transacoes"],
        summary: "Listar transacoes por periodo",
        security: [
          {bearerAuth: []}
        ],
        parameters: [
          {
            name: 'Inicio',
            in: 'query',
            required: true,
            description: 'Data de inicio do periodo',
            schema: {type: 'string', example: "10/04/2026"}
          },
          {
            name: 'fim',
            in: 'query',
            required: true,
            description: 'Data de fim do periodo',
            schema: {type: 'string', example: "13/04/2026"}
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lista_Transacoes" }
                }
              }
            }
          }
        }
      }
    }
  },

  components: {
    securitySchemes:{
      bearerAuth:{
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:'Insira o Token obtido no login'
      }
    },
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
          senha: { type: "string" },
          tipo_acesso: { type: "string", example: "admin" }
        }
      },

      Atualizacao_Usuario: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string" },
          email: { type: "string" },
          senha: { type: "string" },
          tipo_acesso: { type: "string" }
        }
      },

      Login_Usuario: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", example: "usuario@gmail.com" },
          senha: { type: "string", example: "senha123" }
        }
      },

      Resposta_Login: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Login realizado com sucesso"
          },
          token: {
            type:'string',
            description: 'Token JWT gerado',
            example: 'eyjklakgrisikuyy...'
          },
          usuario: {
            type: "object",
            properties: {
              id_usuario: { type: "integer", example: 1 },
              email: { type: "string", example: "usuario@email.com" }
            }
          }
        }
      },

      Lista_Categorias: {
        type: "object",
        properties: {
          id_categoria: { type: "integer", example: 1 },
          nome: { type: "string", example: "Objetos" },
          descricao: { type: "string", example: "Objetos de cor vermelha" },
          tipo: { type: "string", example: "Entrada/Saida" },
          cor: { type: "string", example: "vermelha" },
          icone: { type: "string", example: "link da imagem" },
        }
      },

      Cadastro_Categorias: {
        type: "object",
        required: ["nome", "tipo"],
        properties: {
          nome: { type: "string" },
          descricao: { type: "string" },
          tipo: { type: "string" },
          cor: { type: "string" },
          icone: { type: "string" }
        }
      },

      Atualizacao_Categoria: {
        type: "object",
        required: ["nome", "tipo"],
        properties: {
          nome: { type: "string" },
          descricao: { type: "string" },
          tipo: { type: "string" },
          cor: { type: "string" },
          icone: { type: "string" }
        }
      },

      Lista_Subcategorias: {
        type: "object",
        properties: {
          id_subcategoria: { type: "integer", example: 1 },
          nome: { type: "string", example: "Objetos Feitos a mão" },
          id_categoria: { type: "integer", example: 1 }
        }
      },

      Cadastro_Subcategorias: {
        type: "object",
        required: ["nome", "id_categoria"],
        properties: {
          nome: { type: "string" },
          id_categoria: {type: "integer"}
        }
      },

      Atualizacao_Subcategoria: {
        type: "object",
        required: ["nome", "id_categoria"],
        properties: {
          nome: { type: "string" },
          id_categoria: {type: "integer"}
        }
      },

      Lista_Transacoes: {
        type: "object",
        properties: {
          id_transacoes: {type: 'integer', example: 1},
          valor: {type: 'number', example: 10.00},
          descricao: {type: 'string', example: 'Consulta médica'},
          data_registro: {type: 'string', example: '09/04/2026'},
          data_vencimento: {type: 'string', example: '10/04/2026'},
          data_pagamento: {type: 'string', example: '11/04/2026'},
          tipo: {type: 'string', enum:['E', 'S'], example: 'E'},
          nome_categoria: {type: 'string', example: 'Saúde'},
          nome_subcategoria: {type: 'string', example: 'Consulta médica'}
        }
      },

      Cadastro_Transacoes: {
        type: "object",
        required: ["valor", "tipo"],
        properties: {
          valor: {type: 'number', example: 10.00},
          descricao: {type: 'string', example: 'Consulta médica'},
          data_registro: {type: 'string', example: '09/04/2026'},
          data_vencimento: {type: 'string', example: '10/04/2026'},
          data_pagamento: {type: 'string', example: '11/04/2026'},
          tipo: {type: 'string', enum:['E', 'S'], example: 'E'},
          id_categoria: {type: 'integer', example: '1'},
          id_subcategoria: {type: 'integer', example: '1'}
        }
      },

      Atualizacao_Transacoes: {
        type: "object",
        required: ["valor", "tipo"],
        properties: {
          valor: {type: 'number', example: 10.00},
          descricao: {type: 'string', example: 'Consulta médica'},
          data_registro: {type: 'string', example: '09/04/2026'},
          data_vencimento: {type: 'string', example: '10/04/2026'},
          data_pagamento: {type: 'string', example: '11/04/2026'},
          tipo: {type: 'string', enum:['E', 'S'], example: 'E'},
          id_categoria: {type: 'integer', example: '1'},
          id_subcategoria: {type: 'integer', example: '1'}
        }
      },
    }
  }
};

export default documentacao;