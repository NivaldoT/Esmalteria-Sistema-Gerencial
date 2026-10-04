import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: "Esmalteria Sistema Gerencial - API",
        description: ""
    },
    host: 'localhost:5500',
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            erro: {
                msg: 'Mensagem de erro'
            },
        },
        "@schemas": {
            servico: {
                type: 'object',
                properties: {
                    nome: {
                        type: "string",
                        example: "Manicure",
                        required: true
                    },
                    descricao: {
                        type: "string",
                        example: "Detalhes do serviço de manicure",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    }
                }
            },
            alterarServico: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        required: true
                    },
                    nome: {
                        type: "string",
                        example: "Manicure",
                        required: true
                    },
                    descricao: {
                        type: "string",
                        example: "Detalhes do serviço de manicure",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    }
                }
            },
            cliente: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                        example: "Machado de Assis",
                        required: true
                    },
                    telefone: {
                        type: "string",
                        example: "(11) 12345-6789",
                        required: true
                    },
                    email: {
                        type: "string",
                        example: "machado@exemplo.com",
                        required: true
                    },
                    senha: {
                        type: "string",
                        example: "Senha123@",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    }
                }
            },
            alterarCliente: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        required: true
                    },
                    telefone: {
                        type: "string",
                        example: "(11) 12345-6789",
                        required: true
                    },
                    email: {
                        type: "string",
                        example: "machado@exemplo.com",
                        required: true
                    },
                    senha: {
                        type: "string",
                        example: "Senha123@",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    }
                }
            },
            profissional: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                        example: "Albert Camus",
                        required: true
                    },
                    telefone: {
                        type: "string",
                        example: "(11) 98765-4321",
                        required: true
                    },
                    email: {
                        type: "string",
                        example: "albert@exemplo.com",
                        required: true
                    },
                    senha: {
                        type: "string",
                        example: "Senha123@",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    },
                    cpf: {
                        type: "string",
                        example: "123.456.789-00",
                        required: true
                    }
                }
            },
            alterarProfissional: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        required: true
                    },
                    telefone: {
                        type: "string",
                        example: "(11) 98765-4321",
                        required: true
                    },
                    email: {
                        type: "string",
                        example: "albert@exemplo.com",
                        required: true
                    },
                    senha: {
                        type: "string",
                        example: "Senha123@",
                        required: true
                    },
                    foto: {
                        type: "string",
                        format: "binary"
                    }
                }
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({ openapi: '3.0.0' })(outputJson, routes, doc)
    .then(async () => {
        await import('./server.js');
    })