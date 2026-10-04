import UsuarioRepository from "../repositories/UsuarioRepository.js";
import Model from "./Model.js";


export default class UsuarioModel extends Model {
    #banco;
    #usu_id;
    #usu_nome;
    #usu_telefone;
    #usu_email;
    #usu_senha;
    #usu_perfil;
    #usu_ativo; // '1' ou '0'
    #usu_foto; // caminho da imagem no servidor

    get banco() { return this.#banco; }
    set banco(value) { this.#banco = value; }
    get usu_id() { return this.#usu_id; }
    set usu_id(value) { this.#usu_id = value; }
    get usu_nome() { return this.#usu_nome; }
    set usu_nome(value) { this.#usu_nome = value; }
    get usu_telefone() { return this.#usu_telefone; }
    set usu_telefone(value) { this.#usu_telefone = value; }
    get usu_email() { return this.#usu_email; }
    set usu_email(value) { this.#usu_email = value; }
    get usu_senha() { return this.#usu_senha; }
    set usu_senha(value) { this.#usu_senha = value; }
    get usu_perfil() { return this.#usu_perfil; }
    set usu_perfil(value) { this.#usu_perfil = value; }
    get usu_ativo() { return this.#usu_ativo; }
    set usu_ativo(value) { this.#usu_ativo = value; }
    get usu_foto() { return this.#usu_foto; }
    set usu_foto(value) { this.#usu_foto = value; }

    constructor(banco, usu_id, usu_nome, usu_telefone, usu_email, usu_senha, usu_perfil, usu_ativo, usu_foto) {
        super();
        this.#banco = banco;
        this.#usu_id = usu_id;
        this.#usu_nome = usu_nome;
        this.#usu_telefone = usu_telefone;
        this.#usu_email = usu_email;
        this.#usu_senha = usu_senha;
        this.#usu_perfil = usu_perfil;
        this.#usu_ativo = usu_ativo;
        this.#usu_foto = usu_foto;
    }

    static toMap(row, banco) {
        const caminho = 'http://localhost:5500/uploads/clientes/';
        let usuario = new UsuarioModel(banco, row["usu_id"], row["usu_nome"], row["usu_telefone"], row["usu_email"], row["usu_senha"], row["usu_perfil"], row["usu_ativo"], row["usu_foto"] ? caminho + row["usu_foto"] : caminho + 'usuarioSemFoto.png');
        return usuario;
    }

    validar() {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,99}$/;
        this.#usu_telefone = this.#usu_telefone.replace(/\D/g, ''); // Remove caracteres não numéricos do telefone
        let msg
        if (!this.#usu_nome || this.#usu_nome.length < 3 || this.#usu_nome.length > 100){
            msg = "Nome deve ter entre 3 e 100 caracteres";
            return { ok: false, msg};
        }else if(!this.#usu_telefone || this.#usu_telefone.length != 11){
            msg = "Telefone deve ter 11 caracteres";
            return { ok: false, msg};
        }else if (!this.#usu_email || !this.#usu_email.includes("@")){
            msg = "Email inválido";
            return { ok: false, msg};
        }else if (!regex.test(this.#usu_senha)){
            msg = "Senha inválida";
            return { ok: false, msg};
        }else if (this.#usu_ativo != '1' && this.#usu_ativo != '0'){
            msg = "Status inválido";
            return { ok: false, msg};
        }
        return { ok: true, msg: "Usuário válido"};
    }

    async buscar(usu_id) {
        const repo = new UsuarioRepository(this.#banco);
        let rows = await repo.buscar(usu_id);

        if (rows.length > 0)
            return UsuarioModel.toMap(rows[0], this.#banco);
        return false
    }

    async listar() {
        const repo = new UsuarioRepository(this.#banco);
        let lista = [];
        let rows = await repo.listar();

        for (let row of rows) {
            //console.log(UsuarioModel)
            lista.push(UsuarioModel.toMap(row, this.#banco));
        }
        return lista
    }

    async desativar(usu_id) {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.desativar(usu_id);
    }

    async ativar(usu_id){
        const repo = new UsuarioRepository(this.#banco);
        return await repo.ativar(usu_id);
    }
}