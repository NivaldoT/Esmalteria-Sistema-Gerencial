import Database from "../db/database.js";
import UsuarioModel from "../models/UsuarioModel.js";

export default class UsuarioController {

    constructor() {
    }

    async listarUsuarios(req, res) {
        try {
            const banco = Database.getInstance();
            let usuario = new UsuarioModel(banco);
            let lista = await usuario.listar();
            if (lista.length == 0) {
                return res.status(404).json({ msg: "Nenhum Usuario encontrado!" });
            }
            return res.status(200).json(lista)
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Listar Usuarios!" });
        }
    }
    async buscarUsuario(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let usuario = new UsuarioModel(banco, id);
            usuario = await usuario.buscar(usuario.usu_id)
            if (usuario) {
                return res.status(200).json(usuario);
            } else {
                return res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de buscar Usuário!" });
        }
    }

    async desativarUsuario(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let usuario = new UsuarioModel(banco, id);
            usuario = await usuario.buscar(usuario.usu_id)
            if (usuario) {
                let result = await usuario.desativar(usuario.usu_id);
                if (result)
                    return res.status(200).json({ msg: "Usuário " + usuario.usu_nome + " Desativado." });
                else
                    return res.status(500).json({ msg: "Erro ao desativar Usuário." });
            } else {
                return res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Desativar Usuário!" });
        }
    }
    async ativarUsuario(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let usuario = new UsuarioModel(banco, id);
            usuario = await usuario.buscar(usuario.usu_id)
            if (usuario) {
                let result = await usuario.ativar(usuario.usu_id);
                if (result)
                    return res.status(200).json({ msg: "Usuário " + usuario.usu_nome + " Ativado." });
                else
                    return res.status(500).json({ msg: "Erro ao ativar Usuário." });
            } else {
                return res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de ativar Usuário!" });
        }
    }
}