import Repository from "./Repository.js";
import UsuarioRepository from "./UsuarioRepository.js";


export default class ProfissionalRepository extends UsuarioRepository {

    constructor(banco) {
        super(banco);
    }

    async listar() {

        let sql = "select * from usuario inner join profissional on usu_id = prof_id";

        let rows = await this.banco.ExecutaComando(sql);

        return rows;
    }

    async cadastrar(prof) {
        if (prof.usu_id == 0) {
            await this.banco.AbreTransacao();

            let sql = 'insert into usuario (usu_email, usu_nome, usu_telefone, usu_senha, usu_perfil, usu_ativo, usu_foto) values (?,?,?,?,?,?,?)';
            let valores = [prof.usu_email, prof.usu_nome, prof.usu_telefone, prof.usu_senha, prof.usu_perfil, prof.usu_ativo, prof.usu_foto];
            let id = await this.banco.ExecutaComandoLastInserted(sql, valores);

            sql = "insert into profissional (prof_id, prof_cpf, prof_admissao) values (?, ?, CURDATE())";

            valores = [id, prof.prof_cpf];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

            if (result) {
                await this.banco.Commit();
                return id; 
            } else {
                await this.banco.Rollback();
                return 0;
            }
        } else {
            let sql = "update usuario set usu_email = ?, usu_telefone = ?, usu_senha = ? where usu_id = ?";

            let valores = [prof.usu_email, prof.usu_telefone, prof.usu_senha, prof.usu_id];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async buscar(id) {
        let sql = "select * from usuario inner join profissional on usu_id = prof_id where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        return rows;
    }

    async demitir(id) {
        let sql = 'update profissional set prof_demissao = CURDATE() where prof_id = ?'
        let valores = [id];
        return await this.banco.ExecutaComandoNonQuery(sql, valores)
    }
}