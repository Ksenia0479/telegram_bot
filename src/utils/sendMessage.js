const axios = require('axios');

const { TOKEN, CHAT_ID } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const sendMessage = async ({ message: { chat = { id: CHAT_ID }, text = '' } = {}, ...other }) => {
	await axios.post(`${TELEGRAM_API}/sendMessage`, {
		chat_id: chat.id,
		text,
		...other,
	});
};

module.exports = sendMessage;
