import Repository from "./Repository.js";


export default class UsuarioRepository extends Repository {

    constructor(banco) {
        super(banco);
    }

    // busca usuario pelo email e senha
    async obterPorEmailSenha(email, senha) {
        let sql = "select * from usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let rows = await this.banco.ExecutaComando(sql, valores);

        return rows;
    }
    async validarEmail(email) {
        let sql = "select * from usuario where usu_email = ?";

        let valores = [email];

        let rows = await this.banco.ExecutaComando(sql, valores);
        if(rows.length>0)
            return false;
        return true;
    }

    async listar() {

        let sql = "select * from usuario";

        let rows = await this.banco.ExecutaComando(sql);

        return rows;
    }
    async cadastrar(usuario) {
        if (usuario.id == 0) {
            let sql = "insert into usuario (usu_email, usu_nome, usu_telefone, usu_senha, usu_perfil, usu_ativo, usu_foto) values (?,?,?,?,?,?,?)";

            let valores = [usuario.email, usuario.nome, usuario.telefone, usuario.senha, usuario.perfil, usuario.ativo, usuario.foto];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update usuario set usu_email = ?, usu_nome = ?, usu_telefone = ?, usu_senha = ?, usu_perfil = ?, usu_ativo = ?, usu_foto = ? where usu_id = ?";

            let valores = [usuario.email, usuario.nome, usuario.telefone, usuario.senha, usuario.perfil, usuario.ativo, usuario_foto, usuario.id];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from usuario where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        return rows;
    }

    async excluir(id) {
        let sql = "update usuario set usu_ativo = 0 where usu_id = ?";
        let valores = [id];

        return await this.banco.ExecutaComandoNonQuery(sql, valores);
    }

    async ativar(id){
        let sql = 'update usuario set_ativo = 1 where usu_id = ?';
        let valores = [id];

        return await this.banco.ExecutaComandoNonQuery(sql, valores);
    }

}