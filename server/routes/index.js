const express = require('express');

const app = express();

// importe la ruta delusuario.js para las peticiones GET,PUT,POST,DELETE
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;