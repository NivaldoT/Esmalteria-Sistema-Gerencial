import express from 'express';
import AuthMiddleware from "../middlewares/authMiddlewares.js"
import ProfissionalController from '../controllers/ProfissionalController.js';
import multer from "multer";
import path from "path";

const router = express.Router();
let ctrl = new ProfissionalController();
let auth = new AuthMiddleware();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profissionais");
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);
    const nomeArquivo = Date.now() + "-" + Math.random().toString(36).slice(2) + extensao;
    cb(null, nomeArquivo);
  }
});
const upload = multer({storage});

router.post("/",auth.validarAdmin, upload.single("foto"), (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Cadastra um Profissional.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/profissional"
                    }
                }
            }
        }
    
    */
    ctrl.cadastrar(req, res);
});

router.put("/",auth.validarProfissional, upload.single("foto"), (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Altera os dados de um Profissional.'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/alterarProfissional"
                    }
                }
            }
        }
    */
    ctrl.atualizar(req, res);
});

router.get("/",auth.validarAdmin, (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Lista todos os Profissionals.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.listarProfissional(req, res);
})

router.get("/:id",auth.validarAdmin, (req, res) => {
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Obtém os dados de um Profissional específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.buscarProfissional(req, res);
});

router.delete("/:id",auth.validarAdmin, (req,res) =>{
    //#swagger.tags = ['Profissional']
    //#swagger.summary = 'Demite um Profissional Específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ctrl.demitirProfissional(req, res);
})
export default router;