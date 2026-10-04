import Repository from "./Repository.js";
import fs from 'fs';

export default class ServicoRepository extends Repository {

    constructor(banco) {
        super(banco);
    }

    async cadastrar(servico) {
        if (servico.serv_id == 0) {
            let sql = 'insert into servico(serv_id, serv_nome, serv_descricao, serv_foto) values(?,?,?,?)'
            let valores = [servico.serv_id, servico.serv_nome, servico.serv_descricao, servico.serv_foto];

            let result = await this.banco.ExecutaComandoLastInserted(sql, valores);
            return result
        } else {
            let sql = "update servico set serv_nome = ?, serv_descricao = ?, serv_foto = ? where serv_id = ?";

            let valores = [servico.serv_nome, servico.serv_descricao, servico.serv_foto, servico.serv_id];

            let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async listar() {

        let sql = "select * from servico";

        let rows = await this.banco.ExecutaComando(sql);

        return rows;
    }

    async excluir(servico){
        let sql = 'delete from servico where serv_id = ?';
        let valores = [servico.serv_id];

        if (await this.banco.ExecutaComandoNonQuery(sql, valores)) {
            // Deleta a imagem do serviço do servidor
            let caminhoImagem = `public/uploads/${servico.serv_foto.split('/').pop()}`;
            fs.unlinkSync(caminhoImagem);
            return true;
        }
        return false;
    }

    async buscar(serv_id) {
        let sql = "select * from servico where serv_id = ?";
        let valores = [serv_id];
        let rows = await this.banco.ExecutaComando(sql, valores);
        return rows;
    }
}