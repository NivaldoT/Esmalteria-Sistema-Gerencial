import ClienteRepository from "../repositories/ClienteRepository.js";
import UsuarioModel from "./UsuarioModel.js";


export default class ClienteModel extends UsuarioModel {
    constructor(banco, usu_id, usu_nome, usu_telefone, usu_email, usu_senha, usu_perfil, usu_ativo, usu_foto) {
        super(banco, usu_id, usu_nome, usu_telefone, usu_email, usu_senha, usu_perfil, usu_ativo, usu_foto);
    }

    async cadastrar() {
        const repo = new ClienteRepository(this.banco);
        return await repo.cadastrar(this);
    }

    async buscar(usu_id) {
            const repo = new ClienteRepository(this.banco);
            let rows = await repo.buscar(usu_id);
    
            if (rows.length > 0)
                return ClienteModel.toMap(rows[0], this.banco);
            return false
        }

    toJSON() {
        return {
            banco : this.banco,
            usu_id : this.usu_id,
            usu_nome : this.usu_nome,
            usu_telefone : this.usu_telefone,
            usu_email : this.usu_email,
            usu_senha : this.usu_senha,
            usu_perfil : this.usu_perfil,
            usu_ativo : this.usu_ativo,
            usu_foto : this.usu_foto
        }
    }

    static toMap(row, banco) {
        let usuario = new ClienteModel(banco, row["usu_id"], row["usu_nome"], row["usu_telefone"], row["usu_email"], row["usu_senha"], row["usu_perfil"], row["usu_ativo"],  row["usu_foto"])
        return usuario;
    }
}