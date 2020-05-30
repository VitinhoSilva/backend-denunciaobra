const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

var obraUtil = require('../controllers/Obra');

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

//Obras
app.route('/obra/inserir').post(obraUtil.inserirobra);
app.route('/obra/listar').get(obraUtil.listarobra);
app.route('/obra/filtrar/:id').get(obraUtil.filtrarobra);
app.route('/obra/filtrar/:id').post(obraUtil.filtrarobra);
app.route('/obra/deletar/:id').delete(obraUtil.deletarobra);
app.route('/obra/deletarObjId/:id').delete(obraUtil.deletarobraObjId);
app.route('/obra/atualizar/:id').put(obraUtil.atualizarobra);
app.route('/obra/atualizarObjId/:id').put(obraUtil.atualizarobraObjId);

module.exports = app;
