import express from "express";
import ServicoController from "../controllers/ServicoController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

let ServicoCtrl = new ServicoController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/servicos");
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);
    const nomeArquivo = Date.now() + "-" + Math.random().toString(36).slice(2) + extensao;
    cb(null, nomeArquivo);
  }
});
const upload = multer({storage});

router.post("/", upload.single("foto"), (req, res) => {
    //#swagger.tags = ['Serviço']
    //#swagger.summary = 'Cadastra um Serviço.'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/servico"
                    }
                }
            }
        }
    
    */
    ServicoCtrl.cadastrar(req, res);
});

router.put("/", upload.single("foto"), (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    //#swagger.tags = ['Serviço']
    //#swagger.summary = 'Altera os dados de um Serviço.'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/alterarServico"
                    }
                }
            }
        }
    
    */
    ServicoCtrl.alterar(req, res);
});

router.get("/", (req, res) => {
    //#swagger.tags = ['Serviço']
    //#swagger.summary = 'Lista todos os Serviços.'
    ServicoCtrl.listar(req, res);
});

router.get("/:id", (req, res) => {
    //#swagger.tags = ['Serviço']
    //#swagger.summary = 'Busca um Serviço pelo ID.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ServicoCtrl.buscar(req, res);
});

router.delete("/:id", (req, res) => {
    //#swagger.tags = ['Serviço']
    //#swagger.summary = 'Exclui um Serviço pelo ID.'
    /* #swagger.security = [{
            "jwt": []
    }] */
    ServicoCtrl.excluir(req, res);
});

export default router;