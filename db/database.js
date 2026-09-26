import mysql2 from 'mysql2'

export default class Database {

    static #instance;
    #conexao;
    get conexao() { return this.#conexao; }
    set conexao(conexao) { this.#conexao = conexao; }

    constructor() {
        console.log('construtor chamado')
        //novo
        if (Database.#instance) {
            throw new Error("Use Database.getInstance() para obter a instância do banco de dados.");
        }
        this.#conexao = mysql2.createPool({
            host: global.process.env.host, 
            database: global.process.env.database, 
            user: global.process.env.user, 
            password: global.process.env.password,
            waitForConnections: true,
            connectionLimit: 50, 
            queueLimit: 0 
        });    }
    ///novo
    static getInstance() {
        if (!Database.#instance) { Database.#instance = new Database(); }
        return Database.#instance;
    }


    ExecutaComando(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results);
            });
        })
    }

    ExecutaComandoNonQuery(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results.affectedRows > 0);
            });
        })
    }

    ExecutaComandoLastInserted(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function (res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results.insertId);
            });
        })
    }

}