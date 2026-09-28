import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import Database from '../db/database.js';
const SEGREDO_JWT = global.process.env.segredoJWT
export default class AuthMiddleware {

    token(id, nome, email, perfil) {
        let token = jwt.sign({
            id: id,
            nome: nome,
            email: email,
        }, SEGREDO_JWT);

        return token;
    }

    async validar(req, res, next) {
        if(req.cookies && req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;
            
            try {
                //validar o token e recupera as informações do usuário que estão no token
                let payload = jwt.verify(token, SEGREDO_JWT);
                let banco = Database.getInstance()
                let usuarioRepository = new UsuarioRepository(banco);
                //valida o nosso usuário no banco de dados
                let usuario = await usuarioRepository.buscar(payload.id)
                if(usuario) {
                    //Vem como ENUM S || N
                    if(usuario.ativo) {
                        req.usuarioLogado = usuario;
                        next();
                    }
                    else {
                        return res.status(401).json({msg: "Usuário inativo"});
                    }
                }
                else {
                    return res.status(404).json({msg: "Usuário não encontrado"});
                }
            }
            catch(ex) {
                console.log(ex)
                return res.status(401).json({msg: "Token inválido!"});
            }
        }
        else {
            return res.status(401).json({msg: "Usuário não Autenticado!"});
        }
    }
}