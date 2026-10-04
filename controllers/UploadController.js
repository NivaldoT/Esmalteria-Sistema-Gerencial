import fs from "fs";
import path from "path";

export default class UploadController {
    async upload(req, res) {
        try {
            let imagem = req.params.image;
            const arquivo = path.join(process.cwd(), "clientes", imagem);

            if (!fs.existsSync(arquivo)) {
                return res.status(404).json({ msg: "Imagem não encontrada" });
            }

            return res.sendFile(arquivo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao processar upload de arquivo!" });
        }
    }
}