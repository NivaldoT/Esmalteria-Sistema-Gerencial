import express from 'express';
import multer from "multer";
import path from "path";
import UploadsController from '../controllers/UploadsController.js';
import AuthMiddleware from '../middlewares/authMiddlewares.js';


const router = express.Router();
let controller = new UploadsController();
let auth = new AuthMiddleware();

router.get('/clientes/:image',auth.validarUsuario, (req, res) => {
    //#swagger.tags = ['Uploads']
    //#swagger.summary = 'busca a imagem de um Cliente.'
    controller.pegarImagem(req, res);
});

export default router;