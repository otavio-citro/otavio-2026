const documentacao = {
  openapi: "3.0.3",
  info: {
    title: "API Ordem de Serviços",
    description: "Documentação da API de usuários, categorias, subcategorias e transações",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Servidor local"
    }
  ],
  tags: [
    { name: "Usuários", description: "operações de usuários" },
    { name: "Categorias", description: "operações de categorias" },
    { name: "Subcategorias", description: "operações de subcategorias" },
    { name: "Transações", description: "operações de transações" }
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar usuários",
        responses: {
          200: {
            description: "Lista de usuários",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Usuario" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Usuários"],
        summary: "Cadastrar usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Usuario" }
            }
          }
        },
        responses: {
          201: { description: "Usuário criado" }
        }
      }
    },
    "/usuarios/{id_usuario}": {
      put: {
        tags: ["Usuários"],
        summary: "Atualizar usuário",
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
              schema: { $ref: "#/components/schemas/Cadastro_Usuario" }
            }
          }
        },
        responses: {
          200: { description: "Atualizado" },
          404: { description: "Não encontrado" }
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
          200: { description: "Removido" }
        }
      }
    },
    "/login": {
      post: {
        tags: ["Usuários"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Login" }
            }
          }
        },
        responses: {
          200: {
            description: "Login OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resposta_Login" }
              }
            }
          }
        }
      }
    },
    "/categorias": {
      get: {
        tags: ["Categorias"],
        summary: "Listar categorias",
        responses: {
          200: {
            description: "Lista de categorias",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Categoria" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Categorias"],
        summary: "Cadastrar categoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Categoria" }
            }
          }
        },
        responses: {
          201: { description: "Categoria criada" }
        }
      }
    },
    "/categorias/{id_categoria}": {
      put: {
        tags: ["Categorias"],
        summary: "Atualizar categoria",
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
              schema: { $ref: "#/components/schemas/Cadastro_Categoria" }
            }
          }
        },
        responses: {
          200: { description: "Atualizada" },
          404: { description: "Não encontrada" }
        }
      },
      delete: {
        tags: ["Categorias"],
        summary: "Remover categoria",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Removida" }
        }
      }
    },
    "/subcategorias": {
      get: {
        tags: ["Subcategorias"],
        summary: "Listar subcategorias",
        responses: {
          200: {
            description: "Lista de subcategorias",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Subcategoria" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Subcategorias"],
        summary: "Cadastrar subcategoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Subcategoria" }
            }
          }
        },
        responses: {
          201: { description: "Subcategoria criada" }
        }
      }
    },
    "/subcategorias/{id_subcategoria}": {
      put: {
        tags: ["Subcategorias"],
        summary: "Atualizar subcategoria",
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
              schema: { $ref: "#/components/schemas/Cadastro_Subcategoria" }
            }
          }
        },
        responses: {
          200: { description: "Atualizada" },
          404: { description: "Não encontrada" }
        }
      },
      delete: {
        tags: ["Subcategorias"],
        summary: "Remover subcategoria",
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Removida" }
        }
      }
    },
    "/transacoes": {
      get: {
        tags: ["Transações"],
        summary: "Listar transações",
        responses: {
          200: {
            description: "Lista de transações",
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
      post: {
        tags: ["Transações"],
        summary: "Cadastrar transação",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastro_Transacao" }
            }
          }
        },
        responses: {
          201: { description: "Transação criada" }
        }
      }
    },
    "/transacoes/{id_transacoes}": {
      put: {
        tags: ["Transações"],
        summary: "Atualizar transação",
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
              schema: { $ref: "#/components/schemas/Cadastro_Transacao" }
            }
          }
        },
        responses: {
          200: { description: "Atualizada" },
          404: { description: "Não encontrada" }
        }
      },
      delete: {
        tags: ["Transações"],
        summary: "Remover transação",
        parameters: [
          {
            name: "id_transacoes",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Removida" }
        }
      }
    }
  },
  components: {
    schemas: {
      Usuario: {
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
      Login: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", example: "usuario@gmail.com" },
          senha: { type: "string", example: "123456" }
        }
      },
      Resposta_Login: {
        type: "object",
        properties: {
          message: { type: "string" },
          usuario: {
            type: "object",
            properties: {
              id_usuario: { type: "integer" },
              email: { type: "string" }
            }
          }
        }
      },
      Categoria: {
        type: "object",
        properties: {
          id_categoria: { type: "integer", example: 1 },
          nome: { type: "string", example: "Eletrônicos" },
          descricao: { type: "string" },
          tipo: { type: "string" },
          cor: { type: "string" },
          icone: { type: "string" },
          ativo: { type: "boolean", example: true }
        }
      },
      Cadastro_Categoria: {
        type: "object",
        required: ["nome"],
        properties: {
          nome: { type: "string" },
          descricao: { type: "string" },
          tipo: { type: "string" },
          cor: { type: "string" },
          icone: { type: "string" }
        }
      },
      Subcategoria: {
        type: "object",
        properties: {
          id_subcategoria: { type: "integer", example: 1 },
          nome: { type: "string", example: "Mouse" },
          id_categoria: { type: "integer", example: 1 },
          ativo: { type: "boolean", example: true }
        }
      },
      Cadastro_Subcategoria: {
        type: "object",
        required: ["nome", "id_categoria"],
        properties: {
          nome: { type: "string", example: "Mouse" },
          id_categoria: { type: "integer", example: 1 }
        }
      },
      Transacao: {
        type: "object",
        properties: {
          id_transacoes: { type: "integer", example: 1 },
          valor: { type: "number", example: 100.5 },
          descricao: { type: "string" },
          data_registro: { type: "string", example: "2025-01-01 10:00:00" },
          data_pagamento: { type: "string" },
          data_vencimento: { type: "string" },
          tipo: { type: "string", example: "entrada" },
          id_categoria: { type: "integer" },
          id_subcategoria: { type: "integer" },
          ativo: { type: "boolean", example: true }
        }
      },
      Cadastro_Transacao: {
        type: "object",
        required: ["valor", "tipo"],
        properties: {
          valor: { type: "number", example: 100.5 },
          descricao: { type: "string" },
          data_vencimento: { type: "string", example: "2025-01-10" },
          tipo: { type: "string", example: "entrada" },
          id_categoria: { type: "integer" },
          id_subcategoria: { type: "integer" }
        }
      }
    }
  }
};

export default documentacao;