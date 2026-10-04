import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import AuthMiddleware from "../middlewares/authMiddlewares.js"

const router = express.Router();
let ctrl = new UsuarioController();
let auth = new AuthMiddleware();

router.get("/", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Lista todos os usuários.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.listarUsuarios(req, res);
})

router.post("/desativar/:id", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Desativa um usuário específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.desativarUsuario(req, res);
});

router.post("/ativar/:id", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Ativa um usuário específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.ativarUsuario(req, res);
});
export default router;