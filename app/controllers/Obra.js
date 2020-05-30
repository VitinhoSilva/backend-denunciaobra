const cliente = require('../../database.js');

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
         const tabela = 'CREATE TABLE IF NOT EXISTS denuncia (id SERIAL NOT NULL PRIMARY KEY, data_denuncia DATE NOT NULL, autor_denuncia VARCHAR(255) NOT NULL, x NUMERIC NOT NULL, y NUMERIC NOT NULL, obsevacao TEXT NOT NULL);';
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
        const {data, autor, x, y, observacao} = req.body;
        if (data && autor && x && y && observacao) {
            const inserting = `INSERT INTO denuncia (data_denuncia, autor_denuncia, x, y, obsevacao) VALUES ('${data}', '${autor}' , ${x}, ${y}, '${observacao}');`;
            const pg = await cliente.connection();
            await pg.query(inserting).then((response) => {
               res.json({result: 'Campo inserido com sucesso!'});
            }).catch((err) => {
                console.log('erro: ', err);
                res.json({
                    msg: 'Contate o administrador do sistema!',
                    erro: err
                });
             });
        } else {
            res.json({erro: 'Campos incorretos!'});
        }
    } catch (err) {
        console.log('erro: ', err);
        res.json({
            msg: 'Contate o administrador do sistema!',
            erro: err
        });
    }
}

async function listarObra(req, res) {
    try {
        const selecting = `SELECT * FROM denuncia;`;
        const pg = await cliente.connection();
        await pg.query(selecting).then((response) => {
            res.json({result: response.rows});
        }).catch((err) => {
            console.log('erro: ', err);
            res.json({
                msg: 'Contate o administrador do sistema!',
                erro: err
            });
        });
    } catch (err) {
        console.log('erro: ', err);
        res.json({
            msg: 'Contate o administrador do sistema!',
            erro: err
        });
    }
}

async function filtrarObra(req, res) {
    try {
        const id = req.params.id;
        const selecting = `SELECT * FROM denuncia WHERE id = ${id}`;
        const pg = await cliente.connection();
        await pg.query(selecting).then((response) => {
            if (response.rowCount) {
                res.json({result: response.rows});
            } else {
                res.json({
                    msg: 'Id não cadastrado!'
                });
            }
        }).catch((err) => {
            console.log('erro: ', err);
            res.json({
                msg: 'Contate o administrador do sistema!',
                erro: err
            });
        });
    } catch (err) {
        console.log('erro: ', err);
        res.json({
            msg: 'Contate o administrador do sistema!',
            erro: err
        });
    }
}

async function deletarObra(req, res) {
    try {
        const id = req.params.id;
        const deleting = `DELETE FROM denuncia WHERE id = ${id}`;
        const pg = await cliente.connection();
        await pg.query(deleting).then((response) => {
            if (response.rowCount) {
                res.json({result: 'Campo deletado com sucesso!'});
            } else {
                res.json({
                    msg: 'Id não cadastrado!'
                });
            }
        }).catch((err) => {
            console.log('erro: ', err);
            res.json({
                msg: 'Contate o administrador do sistema!',
                erro: err
            });
        });
    } catch (err) {
        console.log('erro: ', err);
        res.json({
            msg: 'Contate o administrador do sistema!',
            erro: err
        });
    }
}

async function atualizarObra(req, res) {
    try {
        const id = req.params.id;
        const {data, autor, x, y, observacao} = req.body;
        if (data && autor && x && y && observacao) {
            const updating = `UPDATE denuncia SET data_denuncia = '${data}', autor_denuncia = '${autor}', x = ${x}, y = ${y}, obsevacao = '${observacao}' WHERE id = ${id}`
            const pg = await cliente.connection();
            await pg.query(updating).then((response) => {
                if (response.rowCount) {
                    res.json({result: 'Campo atualizado com sucesso!'});
                } else {
                    res.json({
                        msg: 'Id não cadastrado!'
                    });
                }              
            }).catch((err) => {
                console.log('erro: ', err);
                res.json({
                    msg: 'Contate o administrador do sistema!',
                    erro: err
                });
             });
        } else {
            res.json({erro: 'Campos incorretos!'});
        }
    } catch (err) {
        console.log('erro: ', err);
        res.json({
            msg: 'Contate o administrador do sistema!',
            erro: err
        });
    }
}