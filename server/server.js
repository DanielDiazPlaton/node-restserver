// Require''

require('./config/config');

const express = require('express');
const mongoose = require('mongoose'); // Libreria de mongoDb
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Habilitar la carpeta public donde se alojara la pagina web
app.use(express.static(path.resolve(__dirname, '../public')));


// Configuracion global de rutas del archivo index.js para las peticiones GET,PUT,POST,DELETE
app.use(require('./routes/index.js'));


// mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
//     if (err) throw err;

//     console.log('Connection Database is Successfully!');

// });


/**
 * En dado caso de que la tabla no este creada, al hacer la peticion
 * post se crea la tabla en mongoDB
 * mongodb+srv://daniel:<password>@cluster0.vfexv.mongodb.net/cafe
 */
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;

    console.log('Connection Database is Successfully!');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT }`);
});