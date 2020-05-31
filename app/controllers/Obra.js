const cliente = require('../../database.js');
const moment = require('moment');

const obraUtil = {
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
         const tabela = 'CREATE TABLE IF NOT EXISTS denuncia (id SERIAL NOT NULL PRIMARY KEY, data_denuncia VARCHAR(10) NOT NULL, autor_denuncia VARCHAR(255) NOT NULL, x NUMERIC NOT NULL, y NUMERIC NOT NULL, observacao TEXT NOT NULL);';
         const pg = await cliente.connection();
         await pg.query(tabela).then((response) => {
            console.log('Tabela criada com sucesso, ou já existia!');
         }).catch((err) => {
            console.log('erro ao criar tabela: ', err);
          });
    } catch (err) {
        console.log('erro: ', err);
    }
}

async function inserirObra(req, res) {
    try {
        const {autor, x, y, observacao} = req.body;
        if (autor && x && y && observacao) {
            const inserting = `INSERT INTO denuncia (data_denuncia, autor_denuncia, x, y, observacao) VALUES ('${moment().format('DD/MM/YYYY')}', '${autor}' , ${x}, ${y}, '${observacao}');`;
            const pg = await cliente.connection();
            await pg.query(inserting).then((response) => {
                const result = {result: 'Campo inserido com sucesso!'};
                res.json(result);
            }).catch((err) => {
                console.log('erro: ', err);
                const result = {
                    msg: 'Contate o administrador do sistema!',
                    erro: err
                };
                res.json(result);
             });
        } else {
            const result = {erro: 'Campos incorretos!'};
            res.json(result);
        }
    } catch (err) {
        console.log('erro: ', err);
        const result = {
            msg: 'Contate o administrador do sistema!',
            erro: err
        };
        res.json(result);
    }
}

async function listarObra(req, res) {
    try {
        const selecting = `SELECT * FROM denuncia;`;
        const pg = await cliente.connection();
        await pg.query(selecting).then((response) => {
            const result = {obras: response.rows};
            res.json(result);
        }).catch((err) => {
            console.log('erro: ', err);
            const result = {
                msg: 'Contate o administrador do sistema!',
                erro: err
            };
            res.json(result);

        });
    } catch (err) {
        console.log('erro: ', err);
        const result = {
            msg: 'Contate o administrador do sistema!',
            erro: err
        };
        res.json(result);
    }
}

async function filtrarObra(req, res) {
    try {
        const id = req.params.id;
        const selecting = `SELECT * FROM denuncia WHERE id = ${id}`;
        const pg = await cliente.connection();
        await pg.query(selecting).then((response) => {
            if (response.rowCount) {
                const result = {obras: response.rows};
                res.json(result);
            } else {
                const result = {
                    msg: 'Id não cadastrado!',
                };
                res.json(result);
            }
        }).catch((err) => {
            console.log('erro: ', err);
            const result = {
                msg: 'Contate o administrador do sistema!',
                erro: err
            };
            res.json(result);
        });
    } catch (err) {
        console.log('erro: ', err);
        const result = {
            msg: 'Contate o administrador do sistema!',
            erro: err
        };
        res.json(result);
    }
}

async function deletarObra(req, res) {
    try {
        const id = req.params.id;
        const deleting = `DELETE FROM denuncia WHERE id = ${id}`;
        const pg = await cliente.connection();
        await pg.query(deleting).then((response) => {
            if (response.rowCount) {
                const result = {result: 'Campo deletado com sucesso!'};
                res.json(result);
            } else {
                const result = {
                    msg: 'Id não cadastrado!',
                };
                res.json(result);
            }
        }).catch((err) => {
            console.log('erro: ', err);
            const result = {
                msg: 'Contate o administrador do sistema!',
                erro: err
            };
            res.json(result);
        });
    } catch (err) {
        console.log('erro: ', err);
        const result = {
            msg: 'Contate o administrador do sistema!',
            erro: err
        };
        res.json(result);
    }
}

async function atualizarObra(req, res) {
    try {
        const id = req.params.id;
        const {autor, x, y, observacao} = req.body;
        if (data && autor && x && y && observacao) {
            const updating = `UPDATE denuncia SET data_denuncia = '${moment().format('DD/MM/YYYY')}', autor_denuncia = '${autor}', x = ${x}, y = ${y}, observacao = '${observacao}' WHERE id = ${id}`
            const pg = await cliente.connection();
            await pg.query(updating).then((response) => {
                if (response.rowCount) {
                    const result = {result: 'Campo atualizado com sucesso!'};
                    res.json(result);
                } else {
                    const result = {
                        msg: 'Id não cadastrado!',
                    };
                    res.json(result);
                }              
            }).catch((err) => {
                console.log('erro: ', err);
                const result = {
                    msg: 'Contate o administrador do sistema!',
                    erro: err
                };
                res.json(result);
             });
        } else {
            res.json({erro: 'Campos incorretos!'});
        }
    } catch (err) {
        console.log('erro: ', err);
        const result = {
            msg: 'Contate o administrador do sistema!',
            erro: err
        };
        res.json(result);
    }
}