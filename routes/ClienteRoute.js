import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import AuthMiddleware from "../middlewares/authMiddlewares.js"
import ClienteController from '../controllers/ClienteController.js';

const router = express.Router();
let ClienteCtrl = new ClienteController();
let UsuarioCtrl = new UsuarioController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Cadastra um Cliente.'
    ClienteCtrl.cadastrar(req, res);
});

router.put("/", (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Altera os dados de um Cliente.'
    ClienteCtrl.atualizar(req, res);
});

router.get("/", (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Lista todos os Clientes.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ClienteCtrl.listarClientes(req, res);
})

router.get("/:id", (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Obtém os dados de um Cliente específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ClienteCtrl.buscarCliente(req, res);
});


export default router;