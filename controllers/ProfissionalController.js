import Database from "../db/database.js";
import ProfissionalModel from "../models/ProfissionalModel.js";
import fs from 'fs';
export default class ProfissionalController {

    async cadastrar(req, res) {
        try {
            const banco = Database.getInstance()
            let { nome, telefone, email, senha, cpf } = req.body;
            let profissional = new ProfissionalModel(banco, 0, nome, telefone, email, senha, 'profissional', 1, req.file?.filename || null, cpf);
            let { ok, msg } = profissional.validar();
            if (ok) {

                let result = await profissional.cadastrar();
                if (result) {
                    profissional.usu_id = result;
                    return res.status(201).json({ profissional });
                } else {
                    return res.status(500).json({ msg: "Erro ao cadastrar profissional!" });
                }
            } else {
                return res.status(400).json({ msg });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Cadastro!" });
        }
    }
    async atualizar(req, res) {
        try {
            const banco = Database.getInstance()
            let { id, telefone, email, senha } = req.body;

            // let profissional = new ProfissionalModel(banco, req.usuarioLogado.usu_id); quando fizer o auth usa=lo aqui
            let profissional = new ProfissionalModel(banco, id);
            profissional = await profissional.buscar(profissional.usu_id)
            if (!profissional) {
                return res.status(404).json({ msg: "Profissional não encontrado!" })
            }
            let fotoAntiga = profissional.usu_foto; // Armazena a foto antiga para exclusão posterior
            //altero os dados que é permitido alterar
            profissional.usu_email = email;
            profissional.usu_senha = senha;
            profissional.usu_telefone = telefone;
            profissional.usu_foto = req.file?.filename || null;

            let { ok, msg } = profissional.validar();
            if (ok) {
                let result = await profissional.cadastrar();
                if (result) {
                    // Exclui a foto antiga do servidor
                    if (fotoAntiga) {
                        const caminhoImagemAntiga = `public/uploads/${fotoAntiga.split('/').pop()}`;
                        fs.unlinkSync(caminhoImagemAntiga);
                    }
                    return res.status(200).json({ msg: "profissional Atualizado!", profissional });
                }

                throw new Error("Erro ao atualizar profissional no banco de dados");
            } else {
                return res.status(400).json({ msg })
            }

        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Atualização!" });
        }

    }
    async listarProfissional(req, res) {
        try {
            const banco = Database.getInstance();
            let profissional = new ProfissionalModel(banco);
            let lista = await profissional.listar();
            if (lista.length == 0) {
                return res.status(404).json({ msg: "Nenhum profissional encontrado!" });
            }
            return res.status(200).json(lista)
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Listar profissionais!" });
        }
    }
    async buscarProfissional(req, res) {
        try {
            const banco = Database.getInstance();

            let id = req.params.id;
            let profissional = new ProfissionalModel(banco, id);
            profissional = await profissional.buscar(profissional.usu_id)
            if (profissional) {
                return res.status(200).json(profissional);
            } else {
                return res.status(404).json({ msg: "Profissional não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de buscar Profissional!" });
        }
    }

    async demitirProfissional(req, res) {
        try {
            const banco = Database.getInstance();

            let id = req.params.id;
            let profissional = new ProfissionalModel(banco, id);
            profissional = await profissional.buscar(profissional.usu_id)
            if (profissional) {
                let result = await profissional.demitir(profissional.usu_id)
                if (result)
                    return res.status(200).json({ msg: "Profissional Demitido." })
                else
                    return res.status(500).json({ msg: "Erro ao demitir Profissional!" });
            } else {
                return res.status(404).json({ msg: "Profissional não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de demitir Profissional!" });
        }
    }
}