const mongoose = require('mongoose');

// Definir el esquema de la conversación
const conversationSchema = new mongoose.Schema({
    clientId: String,
    conversation: Array,
    timestamp: { type: Date, default: Date.now }
});

// Crear el modelo de conversación
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
