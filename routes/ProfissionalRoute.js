import express from 'express';
import AuthMiddleware from "../middlewares/authMiddlewares.js"
import ProfissionalController from '../controllers/ProfissionalController.js';

const router = express.Router();
let ctrl = new ProfissionalController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Cadastra um Profissional.'
    ctrl.cadastrar(req, res);
});

router.put("/", (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Altera os dados de um Profissional.'
    ctrl.atualizar(req, res);
});

router.get("/", (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Lista todos os Profissionals.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.listarProfissional(req, res);
})

router.get("/:id", (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Obtém os dados de um Profissional específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.buscarProfissional(req, res);
});

router.delete("/:id", (req,res) =>{
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Demite um Profissional Específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.demitirProfissional(req, res);
})
export default router;