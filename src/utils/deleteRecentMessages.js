const axios = require('axios');

const { TOKEN, CHAT_ID } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const deleteRecentMessages = async (firstMessageId, lastMessageId) => {
	for (let i = 50; i >= 0; i--) {
		await axios
			.post(`${TELEGRAM_API}/deleteMessage`, { chat_id: CHAT_ID, message_id: lastMessageId + 1 - i })
			.then((e) => e)
			.catch((e) => e);
	}
};

module.exports = deleteRecentMessages;
