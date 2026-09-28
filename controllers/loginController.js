import AuthMiddleware from "../middlewares/authMiddlewares.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class LoginController {

    #usuarioRepository;

    constructor() {
        this.#usuarioRepository = new UsuarioRepository();
    }

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
                let login = await this.#usuarioRepository.autenticar(email, senha);
                if (login) {
                    if (login.ativo == false) {
                        return res.status(403).json({ msg: "Usuário inativo." });
                    }
                    let auth = new AuthMiddleware();
                    let token = auth.token(login.id, login.nome, login.email);
                    //Devolve a cookie com o token
                    res.cookie("token", token, { httpOnly: true });
                    return res.status(200).json({
                        msg: "Login realizado com sucesso",
                        login: {
                            id: login.id,
                            nome: login.nome,
                            email: login.email
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
