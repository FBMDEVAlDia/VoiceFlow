const mongoose = require('mongoose');

// URL de conexión a tu base de datos MongoDB local
const mongoURI = 'mongodb://localhost:27017/mi_base_de_datos';

// Conectar a MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;

// Manejar errores de conexión
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB correctamente');
});

module.exports = db;
