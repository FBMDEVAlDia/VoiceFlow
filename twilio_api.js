const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Twilio
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint para iniciar una llamada
app.post('/iniciar_llamada', async (req, res) => {
    const { to, from, url } = req.body;
    try {
        const call = await client.calls.create({
            twiml: `<Response><Say>Hello, thanks for calling!</Say></Response>`,
            to,
            from,
            url
        });
        res.status(200).json({ message: 'Llamada iniciada correctamente', call });
    } catch (error) {
        console.error('Error al iniciar la llamada:', error);
        res.status(500).json({ error: 'Error al iniciar la llamada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
