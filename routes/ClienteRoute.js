import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import AuthMiddleware from "../middlewares/authMiddlewares.js"
import ClienteController from '../controllers/ClienteController.js';
import multer from "multer";
import path from "path";

const router = express.Router();

let ClienteCtrl = new ClienteController();
let UsuarioCtrl = new UsuarioController();
let auth = new AuthMiddleware();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/clientes");
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);
    const nomeArquivo = Date.now() + "-" + Math.random().toString(36).slice(2) + extensao;
    cb(null, nomeArquivo);
  }
});
const upload = multer({storage});

router.post("/", upload.single("foto"), (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Cadastra um Cliente.'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/cliente"
                    }
                }
            }
        }
    */
    ClienteCtrl.cadastrar(req, res);
});

router.put("/", auth.validarCliente, upload.single("foto"), (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Altera os dados de um Cliente.'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/alterarCliente"
                    }
                }
            }
        }
    */
    ClienteCtrl.alterar(req, res);
});

router.get("/", auth.validarAdmin, (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Lista todos os Clientes.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ClienteCtrl.listarClientes(req, res);
})

router.get("/:id", auth.validarAdmin, (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Obtém os dados de um Cliente específico.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ClienteCtrl.buscarCliente(req, res);
});


export default router;