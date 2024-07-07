const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/respuestas_voiceflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Añadir esta opción para asegurarse de que la base de datos y la colección se creen si no existen
    useCreateIndex: true,
    autoIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', async () => {
    // Verificar y crear la colección si no existe
    await mongoose.connection.db.createCollection('respuestas', function(err, res) {
        if (err) throw err;
        console.log("Colección 'respuestas' verificada o creada");
    });
    console.log('Conectado a MongoDB correctamente');
});

app.use(bodyParser.json());

// Definir el esquema de respuestas
const respuestaSchema = new mongoose.Schema({
    pregunta: String,
    respuestaUsuario: String,
    respuestaVoiceflow: String,
    fecha: { type: Date, default: Date.now }
});

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

// Endpoint para guardar respuestas
app.post('/guardar_respuesta', async (req, res) => {
    const { pregunta, respuestaUsuario, respuestaVoiceflow } = req.body;
    try {
        const nuevaRespuesta = new Respuesta({ pregunta, respuestaUsuario, respuestaVoiceflow });
        await nuevaRespuesta.save();
        res.status(201).json({ message: 'Respuesta guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar respuesta:', error);
        res.status(500).json({ error: 'Error al guardar respuesta' });
    }
});

// Endpoint para obtener respuestas
app.get('/obtener_respuestas', async (req, res) => {
    try {
        const respuestas = await Respuesta.find();
        res.status(200).json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ error: 'Error al obtener respuestas' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
