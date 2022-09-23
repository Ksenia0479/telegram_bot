const formatData = require('../utils/formatData');
const sendMessage = require('../utils/sendMessage');

const { ACCOUNTING_UTILITIES_CHAT_ID } = process.env;

const sendDataToAnotherChat = (item) => {
	const date = new Date();
	sendMessage({
		parse_mode: 'Markdown',
		message: {
			chat: { id: ACCOUNTING_UTILITIES_CHAT_ID },
			text: `${date.toLocaleDateString()}\n\n${formatData(item, ':\n', '*')}`,
		},
	});
};

module.exports = sendDataToAnotherChat;
