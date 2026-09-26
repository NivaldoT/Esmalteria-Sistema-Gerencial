import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'

const result = dotenv.config()

if (result.error) {
  throw result.error
}
console.log(result.parsed)



import usuarioRouter from "./routes/UsuarioRoute.js";

import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import http from 'http'
const server = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

//Swagger
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const outputJson = require("./swagger-output.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson, {
    swaggerOptions: {
        withCredentials: true //para permitir o envio de cookies da nossa rota /docs
    }
}))

//rotas
app.use("/usuario", usuarioRouter);

server.listen('5500', function () {
    console.log('backend em execução na porta 5500');
})