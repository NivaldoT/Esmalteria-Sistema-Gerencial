import ProfissionalRepository from "../repositories/ProfissionalRepository.js";
import UsuarioModel from "./UsuarioModel.js";


export default class ProfissionalModel extends UsuarioModel {
    #prof_cpf;
    #prof_admissao;
    #prof_demissao;

    get prof_cpf(){ return this.#prof_cpf }
    set prof_cpf(value){ this.#prof_cpf = value }
    get prof_admissao(){ return this.#prof_admissao }
    set prof_admissao(value){ this.#prof_admissao = value }
    get prof_demissao(){ return this.#prof_demissao }
    set prof_demissao(value){ this.#prof_demissao = value }
    constructor(banco, usu_id, usu_nome, usu_telefone, usu_email, usu_senha, usu_perfil, usu_ativo, usu_foto, prof_cpf, prof_admissao, prof_demissao) {
        super(banco, usu_id, usu_nome, usu_telefone, usu_email, usu_senha, usu_perfil, usu_ativo, usu_foto);
        this.#prof_cpf = prof_cpf
        this.#prof_admissao = prof_admissao;
        this.#prof_demissao = prof_demissao
    }

    validar() {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,99}$/;
        let msg;
        this.prof_cpf = this.prof_cpf.replace(/\D/g, ''); // Remove caracteres não numéricos do CPF
        this.usu_telefone = this.usu_telefone.replace(/\D/g, ''); // Remove caracteres não numéricos do telefone
        
        if (!this.usu_nome || this.usu_nome.length < 3 || this.usu_nome.length > 100) {
            msg = "Nome deve ter entre 3 e 100 caracteres";
            return {ok: false, msg};
        } else if (!this.usu_telefone || this.usu_telefone.length != 11) {
            msg = "Telefone deve ter 11 caracteres";
            return {ok: false, msg};
        } else if (!this.usu_email || !this.usu_email.includes("@")) {
            msg = "Email inválido";
            return {ok: false, msg};
        } else if (!regex.test(this.usu_senha)) {
            msg = "Senha inválida";
            return {ok: false, msg};
        } else if (this.usu_ativo != '1' && this.usu_ativo != '0') {
            msg = "Status inválido";
            return {ok: false, msg};
        }
        else if (!this.validarcpf(this.prof_cpf)) {
            msg = "CPF inválido";
            return {ok: false, msg};
        }

        return {ok: true, msg: "Profissional válido"};
    }

    static toMap(row, banco) {
        const caminho = 'http://localhost:5500/back/profissionais/';
        let profissional = new ProfissionalModel(banco, row["usu_id"], row["usu_nome"], row["usu_telefone"], row["usu_email"], row["usu_senha"], row["usu_perfil"], row["usu_ativo"], row["usu_foto"] ? caminho + row["usu_foto"] : caminho + 'profissionalSemFoto.png', row["prof_cpf"], row["prof_admissao"], row["prof_demissao"]);

        return profissional;
    }

    validarcpf(cpf) {
        // Remove pontos e hífen
        cpf = cpf.replace(/\D/g, '');

        // CPF deve ter 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Rejeita CPFs como 111.111.111-11
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Valida primeiro dígito verificador
        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += Number(cpf[i]) * (10 - i);
        }

        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 !== Number(cpf[9])) {
            return false;
        }

        // Valida segundo dígito verificador
        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += Number(cpf[i]) * (11 - i);
        }

        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        if (digito2 !== Number(cpf[10])) {
            return false;
        }

        return true;
    }

    async cadastrar() {
        const repo = new ProfissionalRepository(this.banco);
        return await repo.cadastrar(this);
    }

    async listar() {
        const repo = new ProfissionalRepository(this.banco);
        let lista = [];
        let rows = await repo.listar();

        for (let row of rows) {
            //console.log(UsuarioModel)
            lista.push(ProfissionalModel.toMap(row, this.banco));
        }
        return lista;
    }

    async buscar(usu_id) {
        const repo = new ProfissionalRepository(this.banco);
        let rows = await repo.buscar(usu_id);

        if (rows.length > 0)
            return ProfissionalModel.toMap(rows[0], this.banco);
        return false
    }

    async demitir(usu_id) {
        const repo = new ProfissionalRepository(this.banco);
        return await repo.demitir(usu_id);
    }

    toJSON() {
        return {
            banco: this.banco,
            prof_cpf: this.prof_cpf, 
            prof_admissao: this.prof_admissao, 
            prof_demissao: this.prof_demissao, 
            banco: this.banco, 
            usu_id: this.usu_id, 
            usu_nome: this.usu_nome, 
            usu_telefone: this.usu_telefone, 
            usu_email: this.usu_email, 
            usu_senha: this.usu_senha, 
            usu_perfil: this.usu_perfil, 
            usu_ativo: this.usu_ativo, 
            usu_foto: this.usu_foto
        }
    }
}