const { sqlConfig } = require('../../knexfile.js');
var sql = require('mssql');

var obraUtil = {
    inserirObra: inserirObra,
    listarObra: listarObra,
    filtrarObra: filtrarObra,
    deletarObra: deletarObra,
    atualizarObra: atualizarObra,
    atualizarObraObjId: atualizarObraObjId,
    deletarObraObjId: deletarObraObjId
}

module.exports = obraUtil;

function criarDatabaseObra(req, res) {j
        var query = `CREATE TABLE IF NOT EXISTS denuncia (
            id  SERIAL NOT NULL PRIMARY KEY,
            data_denuncia DATE NOT NULL,
            autor_denuncia VARCHAR(255) NOT NULL,
            x NUMERIC NOT NULL,
            y NUMERIC NOT NULL,
            obsevacao TEXT NOT NULL
         );`
}

function inserirObra(req, res) {
    
}

function listarObra(req, res) {
    
}


function filtrarObra(req, res) {
    
}

function deletarObra(req, res) {
    
}

function deletaObraObjId(req, res) {
    
}

function atualizarObra(req, res) {
    
}

function atualizarObraObjId(req, res) {
    
}
