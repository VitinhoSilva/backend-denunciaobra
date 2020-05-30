const { Client } = require('pg')
const { pool } = require('../../database.js');
const client = new Client(pool);

var obraUtil = {
    criarDatabaseObra: criarDatabaseObra,
    inserirObra: inserirObra,
    listarObra: listarObra,
    filtrarObra: filtrarObra,
    deletarObra: deletarObra,
    atualizarObra: atualizarObra
}

module.exports = obraUtil;

async function criarDatabaseObra(req, res) {
    try {
        await client.connect();
        var query = `CREATE TABLE IF NOT EXISTS denuncia (
            id  SERIAL NOT NULL PRIMARY KEY,
            data_denuncia DATE NOT NULL,
            autor_denuncia VARCHAR(255) NOT NULL,
            x NUMERIC NOT NULL,
            y NUMERIC NOT NULL,
            obsevacao TEXT NOT NULL
         );`


    } catch (error) {
        console.log(error);
        res.json({err: error});
      }
}

async function inserirObra(req, res) {
    
}

async function listarObra(req, res) {
    
}

async function filtrarObra(req, res) {
    
}

async function deletarObra(req, res) {
    
}

async function atualizarObra(req, res) {
    
}