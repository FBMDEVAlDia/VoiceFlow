const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('./conversationModel');
const interactWithVoiceflow = require('./voiceFlow');
const db = require('./db'); // Conexión a la base de datos Ingresar los datos correspondientes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Ruta para guardar una conversación e interactuar con Voiceflow
app.post('/guardar-conversacion', async (req, res) => {
  const { clientId, message } = req.body;

  try {
    // Guardar la conversación en MongoDB
    const nuevaConversacion = new Conversation({
      clientId,
      conversation: [message],
      timestamp: new Date()
    });
    await nuevaConversacion.save();

    // Interactuar con Voiceflow
    const voiceflowResponse = await interactWithVoiceflow(clientId, message);

    res.status(201).json({ message: 'Conversación guardada y procesada correctamente', voiceflowResponse });
  } catch (error) {
    console.error('Error al guardar o procesar la conversación:', error);
    res.status(500).json({ error: 'Error al guardar o procesar la conversación' });
  }
});

// Ruta para obtener datos de la base de datos
app.get('/obtener-datos/:id', async (req, res) => {
  const clientId = req.params.id;

  try {
    // Obtener datos del cliente desde la base de datos MongoDB
    const cliente = await Conversation.findOne({ clientId });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
