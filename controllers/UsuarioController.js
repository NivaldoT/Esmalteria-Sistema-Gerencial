import Database from "../db/database.js";
import UsuarioModel from "../models/UsuarioModel.js";

export default class UsuarioController {

    constructor() {
    }

    async gravar(req, res) {
        try {
            const banco = Database.getInstance()
            let { nome, telefone, email, senha, perfil, foto } = req.body;

            let usuario = new UsuarioModel(banco,0, nome, telefone, email, senha, perfil, 1, foto);
            if (usuario.validar()) {

                let result = await usuario.cadastrar();
                usuario.id = result;

                return res.status(201).json({ usuario });

            } else {
                return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do usuário!" })
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Cadastro!" });
        }
    }
    async atualizar(req, res) {
        try {
            let { id, nome, email, senha, ativo } = req.body;
            let usuario = new UsuarioModel(id, nome, email, senha, ativo);
            if (usuario.validar() && id) {
                let encontrado = await usuario.obter(usuario.id);
                if (encontrado) {
                    let result = await usuario.cadastrar();
                    if (result) {
                        return res.status(200).json({ msg: "Usuario Atualizado!" });
                    }

                    throw new Error("Erro ao atualizar usuario no banco de dados");
                } else {
                    return res.status(404).json({ msg: "usuario não encontrado!" });
                }
            } else {
                return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do usuário!" })
            }

        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Atualização!" });
        }

    }
    async listarUsuarios(req, res) {
        try {
            let usuario = new UsuarioModel()
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
    async obterUsuario(req, res) {
        try {
            let id = req.params.id;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuario.id)
            if (usuario) {
                return res.status(200).json(usuario);
            } else {
                return res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Obter Usuário!" });
        }
    }
}