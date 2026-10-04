import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import Database from '../db/database.js';
import ClienteModel from '../models/ClienteModel.js';
import ProfissionalModel from '../models/ProfissionalModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
const SEGREDO_JWT = global.process.env.segredoJWT
export default class AuthMiddleware {

    token(id, nome, telefone, email, perfil) {
        let token = jwt.sign({
            usu_id: id,
            usu_nome: nome,
            usu_telefone: telefone,
            usu_email: email,
            usu_perfil: perfil
        }, global.process.env.segredoJWT);

        return token;
    }

    async validarUsuario(req, res, next) {
        if (req.cookies && req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;

            try {
                //validar o token e recupera as informações do usuário que estão no token
                let payload = jwt.verify(token, global.process.env.segredoJWT);
                let banco = Database.getInstance()
                let usuario = new UsuarioModel(banco);
                //valida o nosso usuário no banco de dados
                usuario = await usuario.buscar(payload.usu_id)
                if (usuario) {
                    //Vem como 1 ou 0
                    if (usuario.usu_ativo) {
                        req.usuarioLogado = usuario;
                        next();
                    }
                    else {
                        return res.status(401).json({ msg: "Usuário inativo" });
                    }
                }
                else {
                    return res.status(404).json({ msg: "Usuário não encontrado" });
                }
            }
            catch (ex) {
                console.log(ex)
                return res.status(401).json({ msg: "Token inválido!" });
            }
        }
        else {
            return res.status(401).json({ msg: "Usuário não Autenticado!" });
        }
    }
    async validarCliente(req, res, next) {
        if (req.cookies && req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;

            try {
                //validar o token e recupera as informações do cliente que estão no token
                let payload = jwt.verify(token, global.process.env.segredoJWT); //não está decodificando
                let banco = Database.getInstance()
                let cliente = new ClienteModel(banco);
                //valida o nosso usuário no banco de dados
                cliente = await cliente.buscar(payload.usu_id)
                if (cliente) {
                    //Vem como 1 ou 0
                    if (cliente.usu_ativo) {
                        req.usuarioLogado = cliente;
                        next();
                    }
                    else {
                        return res.status(401).json({ msg: "Usuário inativo" });
                    }
                }
                else {
                    return res.status(404).json({ msg: "Usuário não encontrado" });
                }
            }
            catch (ex) {
                console.log(ex)
                return res.status(401).json({ msg: "Token inválido!" });
            }
        }
        else {
            return res.status(401).json({ msg: "Usuário não Autenticado!" });
        }
    }
    async validarProfissional(req, res, next) {
        if (req.cookies && req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;

            try {
                //validar o token e recupera as informações do profissional que estão no token
                let payload = jwt.verify(token, global.process.env.segredoJWT);
                let banco = Database.getInstance()
                let profissional = new ProfissionalModel(banco);
                //valida o nosso usuário no banco de dados
                profissional = await profissional.buscar(payload.usu_id)
                if (profissional.usu_perfil == 'profissional' || profissional.usu_perfil == 'admin') {
                    //Vem como 1 ou 0
                    if (profissional.usu_ativo) {
                        req.usuarioLogado = profissional;
                        next();
                    }
                    else {
                        return res.status(401).json({ msg: "Usuário inativo" });
                    }
                }
                else {
                    return res.status(404).json({ msg: "Usuário sem permissão para esta funcionalidade!" });
                }
            }
            catch (ex) {
                console.log(ex)
                return res.status(401).json({ msg: "Token inválido!" });
            }
        }
        else {
            return res.status(401).json({ msg: "Usuário não Autenticado!" });
        }
    }
    async validarAdmin(req, res, next) {
        if (req.cookies && req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;

            try {
                //validar o token e recupera as informações do profissional que estão no token
                let payload = jwt.verify(token, global.process.env.segredoJWT);
                let banco = Database.getInstance()
                let profissional = new ProfissionalModel(banco);
                //valida o nosso usuário no banco de dados
                profissional = await profissional.buscar(payload.usu_id)
                if (profissional.usu_perfil == 'admin') {
                    //Vem como 1 ou 0
                    if (profissional.usu_ativo) {
                        req.usuarioLogado = profissional;
                        next();
                    }
                    else {
                        return res.status(401).json({ msg: "Usuário inativo" });
                    }
                }
                else {
                    return res.status(404).json({ msg: "Usuário sem permissão para esta funcionalidade!" });
                }
            }
            catch (ex) {
                console.log(ex)
                return res.status(401).json({ msg: "Token inválido!" });
            }
        }
        else {
            return res.status(401).json({ msg: "Usuário não Autenticado!" });
        }
    }
}