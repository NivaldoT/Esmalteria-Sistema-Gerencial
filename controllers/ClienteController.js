import Database from "../db/database.js";
import ClienteModel from "../models/ClienteModel.js";
import UsuarioModel from "../models/UsuarioModel.js";

export default class ClienteController {

    constructor() {
    }

    async cadastrar(req, res) {
        try {
            const banco = Database.getInstance()
            let { nome, telefone, email, senha, foto } = req.body;

            let cliente = new ClienteModel(banco, 0, nome, telefone, email, senha, 'cliente', 1, foto);
            if (cliente.validar()) {

                let result = await cliente.cadastrar();
                cliente.usu_id = result;

                return res.status(201).json({ cliente });

            } else {
                return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do Cliente!" })
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

            let cliente = new ClienteModel(banco, id); // utilizar authMiddleware
            cliente = await cliente.buscar(cliente.usu_id)
            if (!cliente) {
                return res.status(404).json({ msg: "cliente não encontrado!" })
            }
            //altero os dados que é permitido alterar
            cliente.usu_email = email;
            cliente.usu_senha = senha;
            cliente.usu_telefone = telefone;

            if (cliente.validar()) {
                let result = await cliente.cadastrar();
                if (result) {
                    return res.status(200).json({ msg: "cliente Atualizado!" });
                }

                throw new Error("Erro ao atualizar cliente no banco de dados");
            } else {
                return res.status(400).json({ msg: "Parâmetros incorretos. Por favor confira as informações do usuário!" })
            }

        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Atualização!" });
        }

    }
    async listarClientes(req, res) {
        try {
            const banco = Database.getInstance();
            let cliente = new ClienteModel(banco);
            let lista = await cliente.listar();
            if (lista.length == 0) {
                return res.status(404).json({ msg: "Nenhum cliente encontrado!" });
            }
            return res.status(200).json(lista)
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Listar clientes!" });
        }
    }
    async buscarCliente(req, res) {
        try {
            const banco = Database.getInstance();
            let id = req.params.id;
            let cliente = new ClienteModel(banco, id);
            cliente = await cliente.buscar(cliente.usu_id)
            if (cliente) {
                return res.status(200).json(cliente);
            } else {
                return res.status(404).json({ msg: "Cliente não encontrado!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de buscar Cliente!" });
        }
    }
    
}