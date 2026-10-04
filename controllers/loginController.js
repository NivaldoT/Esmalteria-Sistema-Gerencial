import Database from "../db/database.js";
import AuthMiddleware from "../middlewares/authMiddlewares.js";
import UsuarioModel from "../models/UsuarioModel.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class LoginController {

    //arota chama aqui que faltava
    async usuario(req, res) {
        res.status(200).json(req.usuarioLogado);
    }

    async logout(req, res) {
        res.clearCookie("token");
        return res.status(200).json({ msg: "Logout realizado com sucesso" });
    }

    async login(req, res) {
        try {
            let { email, senha } = req.body;

            if (email && senha) {
                let banco = Database.getInstance()
                let usuario = new UsuarioModel(banco, null, null, null, email, senha);
                usuario = await usuario.autenticar()
                if (usuario) {
                    if (usuario.usu_ativo == false) {
                        return res.status(403).json({ msg: "Usuário inativo. Realize seu cadastro novamente." });
                    }
                    let auth = new AuthMiddleware();
                    let token = auth.token(usuario.usu_id, usuario.usu_nome, usuario.usu_telefone, usuario.usu_email, usuario.usu_perfil);
                    //Devolve a cookie com o token
                    res.cookie("token", token, { httpOnly: true });
                    return res.status(200).json({
                        msg: "Login Efetuado com Sucesso!",
                        login: {
                            id : usuario.usu_id,
                            nome : usuario.usu_nome,
                            telefone : usuario.usu_telefone,
                            email : usuario.usu_email,
                            perfil : usuario.usu_perfil
                        }
                    });
                } else {
                    return res.status(404).json({ msg: "Usuário ou senha incorretos." });
                }
            } else {
                return res.status(404).json({ msg: "Informe um email e uma senha para fazer Login!" });
            }
        }
        catch (ex) {
            console.error(ex);
            return res.status(500).json({ msg: "Erro ao processar requisição de Login!" });
        }
    }
}
