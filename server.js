const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('app/sslcert/privateKey.key', 'utf8');
const certificate = fs.readFileSync('app/sslcert/certificate.crt', 'utf8');
const obraUtil = require('./app/controllers/Obra');
const app = require('./app/routes/router');

const credentials = {key: privateKey, cert: certificate};

obraUtil.criarDatabaseObra();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3017, () => {
	console.log("Backend obras irregulares Conde/PB iniciado em: http://localhost:3017")
});
httpsServer.listen(3018, () => {
	console.log("Backend obras irregulares Conde/PB iniciado em: https://localhost:3018")
});

