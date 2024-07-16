// Importa las dependencias necesarias
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const twilio = require('twilio');

// Configura la aplicación Express y el puerto
const app = express();
const port = process.env.PORT || 3000;

// Configuración de Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = 'whatsapp:+14155238886'; // Número de Twilio Sandbox

// Middleware para parsear los cuerpos de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint para recibir eventos de Voiceflow
app.post('/voiceflow-webhook', async (req, res) => {
    const eventType = req.body.type; // Tipo de evento recibido desde Voiceflow

    // Manejar eventos específicos que indiquen enviar mensajes a WhatsApp
    if (eventType === 'send_whatsapp_message') {
        const recipientNumber = req.body.recipient;
        const message = req.body.message;

        try {
            // Enviar mensaje a través de Twilio hacia WhatsApp
            await twilioClient.messages.create({
                from: twilioNumber,
                to: recipientNumber,
                body: message
            });

            res.status(200).send('Message sent successfully');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        // Otros tipos de eventos pueden ser manejados aquí según sea necesario
        res.status(200).send('Event received');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
