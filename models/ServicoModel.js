import ServicoRepository from "../repositories/ServicoRepository.js";
import Model from "./Model.js";


export default class ServicoModel extends Model {
    #banco;
    #serv_id;
    #serv_nome;
    #serv_descricao;
    #serv_foto;

    get banco() { return this.#banco; }
    set banco(value) { this.#banco = value; }
    get serv_id() { return this.#serv_id; }
    set serv_id(value) { this.#serv_id = value; }
    get serv_nome() { return this.#serv_nome; }
    set serv_nome(value) { this.#serv_nome = value; }
    get serv_descricao() { return this.#serv_descricao; }
    set serv_descricao(value) { this.#serv_descricao = value; }
    get serv_foto() { return this.#serv_foto; }
    set serv_foto(value) { this.#serv_foto = value; }

    constructor(banco, serv_id, serv_nome, serv_descricao, serv_foto) {
        super();
        this.#banco = banco;
        this.#serv_id = serv_id;
        this.#serv_nome = serv_nome;
        this.#serv_descricao = serv_descricao;
        this.#serv_foto = serv_foto;
    }

    static toMap(row, banco) {
        const caminho = 'http://localhost:5500/back/img/servicos/';
        let servico = new ServicoModel(banco, row["serv_id"], row["serv_nome"], row["serv_descricao"],row["serv_foto"] ? caminho + row["serv_foto"] : caminho + 'servicoSemFoto.png');
        return servico;
    }

    validar() {
        if (!this.#serv_nome || this.#serv_nome.length < 3 || this.#serv_nome.length > 100){
            return false;
        }else if(!this.#serv_descricao || this.#serv_descricao.length < 3 || this.#serv_descricao.length > 300){
            return false;
        }else if (!this.#serv_foto || this.#serv_foto.length < 3 || this.#serv_foto.length > 200){
            return false;
        }
        return true;
    }

    async cadastrar(){
        const repo = new ServicoRepository(this.#banco);
        return await repo.cadastrar(this);
    }

    async listar() {
        const repo = new ServicoRepository(this.#banco);
        let rows = await repo.listar();
        if(rows.length > 0){
            let servicos = [];
            for(let row of rows){
                servicos.push(ServicoModel.toMap(row, this.#banco));
            }
            return servicos;
        }
        return false;
    }

    async excluir(){
        const repo = new ServicoRepository(this.#banco);
        return await repo.excluir(this);
    }
    
    async buscar(serv_id) {
        const repo = new ServicoRepository(this.#banco);
        let rows = await repo.buscar(serv_id);

        if(rows.length > 0){
            return ServicoModel.toMap(rows[0], this.#banco);
        }
        return false;
    }
}