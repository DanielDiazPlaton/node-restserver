// process siempre corre de manera global

// ===============================================================================
// PUERTO
// ===============================================================================

process.env.PORT = process.env.PORT || 3000;

// ===============================================================================
// ENTORNO
// ===============================================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================================================================
// Vencimiento del token
// ===============================================================================

process.env.CADUCIDAD_TOKEN = '48h';

// ===============================================================================
// SEED de autenticacion
// ===============================================================================

process.env.SEED = process.env.SEED || 'prueba-desarrollo';

// ===============================================================================
// Base de datos
// ===============================================================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // urlDB = 'mongodb+srv://daniel:ADVENtista96@cluster0.vfexv.mongodb.net/cafe';
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ===============================================================================
// CLIENT_ID de Google
// ===============================================================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '825953039379-gge174kgrhoi4b1q3slsr1psbakh8nm4.apps.googleusercontent.com';