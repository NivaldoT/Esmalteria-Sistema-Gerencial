import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: "Esmalteria Sistema Gerencial - API",
        description: ""
    },
    host: 'localhost:5500',
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            
            erro: {
                msg: 'Mensagem de erro'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})