import Repository from "./Repository.js";


export default class ClienteRepository extends Repository {

    constructor(banco) {
        super(banco);
    }

    // busca usuario pelo email e senha
    async autenticar(email, senha) {
        let sql = "select * from usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let rows = await this.banco.ExecutaComando(sql, valores);

        return rows;
    }
    async validarEmail(email) {
        let sql = "select * from usuario where usu_email = ?";

        let valores = [email];

        let rows = await this.banco.ExecutaComando(sql, valores);
        if (rows.length > 0)
            return false;
        return true;
    }

    async listar() {

        let sql = "select * from usuario";

        let rows = await this.banco.ExecutaComando(sql);

        return rows;
    }
    async cadastrar(usuario) {
        if (usuario.usu_id == 0) {
            await this.banco.AbreTransacao()

            let sql = "insert into usuario (usu_email, usu_nome, usu_telefone, usu_senha, usu_perfil, usu_ativo, usu_foto) values (?,?,?,?,?,?,?)";
            let valores = [usuario.usu_email, usuario.usu_nome, usuario.usu_telefone, usuario.usu_senha, usuario.usu_perfil, usuario.usu_ativo, usuario.usu_foto];

            let id = await this.banco.ExecutaComandoLastInserted(sql, valores);

            sql = "insert into cliente (cli_id) values (?)";

            let result = await this.banco.ExecutaComandoNonQuery(sql, [id]);
            if(result){
                await this.banco.Commit()
                return id;
            } else {
                await this.banco.Rollback()
                return 0;
            }
        }
        else {
            let sql = "update usuario set usu_email = ?, usu_telefone = ?, usu_senha = ?, usu_foto = ? where usu_id = ?";

            let valores = [usuario.usu_email, usuario.usu_telefone, usuario.usu_senha, usuario.usu_foto, usuario.usu_id];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async buscar(id) {
        let sql = "select * from usuario inner join cliente on usu_id = cli_id where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        return rows;
    }

}