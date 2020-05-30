const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const obraUtil = require('../controllers/Obra');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.route('/obra/inserir').post(obraUtil.inserirObra);
app.route('/obra/listar').get(obraUtil.listarObra);
app.route('/obra/filtrar/:id').get(obraUtil.filtrarObra);
app.route('/obra/deletar/:id').delete(obraUtil.deletarObra);
app.route('/obra/atualizar/:id').put(obraUtil.atualizarObra);

module.exports = app;
