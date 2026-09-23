import UsuarioRepository from "../repositories/usuarioRepository.js";
import Model from "./Model.js";


export default class UsuarioModel extends Model {
    #banco;
    #id;
    #nome;
    #telefone;
    #email;
    #senha;
    #perfil;
    #ativo; // '1' ou '0'
    #foto; // caminho da imagem no servidor

    get banco() { return this.#banco; }
    set banco(value) { this.#banco = value; }
    get id() { return this.#id; }
    set id(value) { this.#id = value; }
    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }
    get telefone() { return this.#telefone; }
    set telefone(value) { this.#telefone = value; }
    get email() { return this.#email; }
    set email(value) { this.#email = value; }
    get senha() { return this.#senha; }
    set senha(value) { this.#senha = value; }
    get perfil() { return this.#perfil; }
    set perfil(value) { this.#perfil = value; }
    get ativo() { return this.#ativo; }
    set ativo(value) { this.#ativo = value; }
    get foto() { return this.#foto; }
    set foto(value) { this.#foto = value; }

    constructor(banco, id, nome, telefone, email, senha, perfil, ativo, foto) {
        this.#banco = banco;
        super();
        this.#id = id;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#senha = senha;
        this.#perfil = perfil;
        this.#ativo = ativo;
        this.#foto = foto;
    }

    static toMap(row) {
        let usuario = new UsuarioEntity(row["usu_id"], row["usu_nome"], row["usu_telefone"], row["usu_email"], row["usu_senha"], row["usu_perfil"], row["usu_ativo"],  row["usu_foto"])
        return usuario;
    }

    validar() {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,99}$/;
        if (!this.#nome || this.#nome.length < 3 || this.#nome.length > 100){
            return false;
        }else if(!this.#telefone || this.#telefone.length != 11){
            return false;
        }else if (!this.#email || !this.#email.includes("@")){
            return false;
        }else if (!regex.test(this.#senha)){
            return false;
        }else if (this.#ativo !== '1' && this.#ativo !== '0'){
            return false;
        }
        return true;
    }

    async cadastrar() {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.cadastrar(this);
    }

    async obter(id) {
        const repo = new UsuarioRepository(this.#banco);
        let rows = await repo.obter(id);

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

    async excluir(id) {
        const repo = new UsuarioRepository(this.#banco);
        return await repo.excluir(id);
    }

}