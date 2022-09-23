const sendMessage = require('./sendMessage');
const replyMessages = require('../data/replyMessages');

const sendCurrentServicesOptions = (data, options) => {
	sendMessage({
		message: { text: replyMessages[data] },
		reply_markup: JSON.stringify({ inline_keyboard: options }),
	});
};

module.exports = sendCurrentServicesOptions;
