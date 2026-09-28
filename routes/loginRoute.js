import express from 'express';
import LoginController from '../controllers/loginController.js';
import AuthMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();
let ctrl = new LoginController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => {
    //#swagger.tags = ['Login']
    //#swagger.summary = 'Loga o usuario e retorna um token de autenticacao.'
    ctrl.login(req, res)
})

router.post("/logout", (req, res) => {
    //#swagger.tags = ['Login']
    //#swagger.summary = 'Remove o token de autenticacao do usuario.'
    ctrl.logout(req, res)
})

router.get("/usuario", auth.validar, (req, res) => {
    //#swagger.tags = ['Login']
    //#swagger.summary = 'Retorna o usuario logado a partir do token.'
    ctrl.usuario(req, res)
})

export default router;
