const axios = require('axios');

const VOICEFLOW_API_KEY = 'VF.DM.666bb20fa12ebf094576ef92.GBdPqOX1wDn4jNqT';
const VOICEFLOW_VERSION_ID = 'PromptVozAlDía';

async function interactWithVoiceflow(userId, input) {
  try {
    const response = await axios.post(`https://general-runtime.voiceflow.com/state/${VOICEFLOW_VERSION_ID}/user/${userId}/interact`, {
      request: {
        type: 'text',
        payload: input
      }
    }, {
      headers: {
        Authorization: `Bearer ${VOICEFLOW_API_KEY}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error en interactWithVoiceflow:', error);
    throw error;
  }
}

module.exports = interactWithVoiceflow;
