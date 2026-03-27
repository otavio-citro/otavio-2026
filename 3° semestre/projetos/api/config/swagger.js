const documentacao = {
  openapi: "3.0.3",
  info: {
    title: "API Ordem de serviços",
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
    { name: "Usuários", description: "operações relacionadas aos usuários" }
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
          usuario: {
            type: "object",
            properties: {
              id_usuario: { type: "integer", example: 1 },
              email: { type: "string", example: "usuario@email.com" }
            }
          }
        }
      }
    }
  }
};

export default documentacao;