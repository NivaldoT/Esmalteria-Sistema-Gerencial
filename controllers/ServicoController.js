import Database from "../db/database.js";
import ServicoModel from "../models/ServicoModel.js";
import fs from 'fs';

export default class ServicoController {

    async cadastrar(req, res) {
        try {
            const banco = Database.getInstance();
            let { nome, descricao } = req.body;
            let servico = new ServicoModel(banco, 0, nome, descricao, req.file.filename);
            if (servico.validar()) {
                let result = await servico.cadastrar();
                servico.serv_id = result;
                return res.status(201).json({ servico });
            } else {
                return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do Serviço!" })
            }
        } catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Cadastro!" });
        }
    }

    async alterar(req, res) {
        try {
            const banco = Database.getInstance();
            let { id, nome, descricao } = req.body;
            let servico = new ServicoModel(banco, id);
            servico = await servico.buscar(servico.serv_id);
            if (servico) {
                let novoServico = new ServicoModel(banco, id, nome, descricao, req.file.filename);
                if (servico.validar()) {
                    if (await novoServico.cadastrar()) { //após cadastrar, deleta a imagem antiga do servidor
                        let imagemAntiga = servico.serv_foto.split('/').pop();
                        let caminhoImagemAntiga = `public/uploads/${imagemAntiga}`;
                        fs.unlinkSync(caminhoImagemAntiga);
                    }
                    return res.status(200).json({ msg: "Serviço alterado com sucesso!" });
                } else {
                    return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do Serviço!" });
                }
            } else {
                return res.status(404).json({ msg: "Serviço não encontrado!" });
            }
        } catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Alteração!" });
        }
    }

    async listar(req, res) {
        try {
            const banco = Database.getInstance();
            let servico = new ServicoModel(banco);
            let lista = await servico.listar();
            return res.status(200).json({ lista });
        } catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Listagem!" });
        }
    }

    async buscar(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let servico = new ServicoModel(banco, id);
            servico = await servico.buscar(servico.serv_id);
            return res.status(200).json({ servico: servico });
        } catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Busca!" });
        }
    }

    async excluir(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let servico = new ServicoModel(banco, id);
            await servico.excluir();
            return res.status(200).json({ msg: "Serviço excluído com sucesso!" });
        } catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Exclusão!" });
        }
    }
}