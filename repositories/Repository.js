
//classe para deixar uma unica instancia de banco

import Database from "../db/database.js";

export default class Repository {
    #banco;
    get banco() {
        return this.#banco;
    }
    set banco(banco) {
        this.#banco = banco;
    }

    constructor(banco) {
        if(!banco){
            throw new Error("Banco de dados não fornecido para o repositório");
        }
        this.#banco = banco;
    }

}