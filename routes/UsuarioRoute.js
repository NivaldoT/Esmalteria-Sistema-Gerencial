import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import AuthMiddleware from "../middlewares/authMiddlewares.js"

const router = express.Router();
let ctrl = new UsuarioController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Cadastra um usuário.'
    ctrl.gravar(req, res);
});

router.put("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Altera os dados de um usuário.'
    ctrl.atualizar(req, res);
});

router.get("/", auth.validar, (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Lista todos os usuários.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.listarUsuarios(req, res);
})

router.get("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Obtém os dados de um usuário específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.obterUsuario(req, res);
});
export default router;