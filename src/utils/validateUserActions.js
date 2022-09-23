const _ = require('lodash');

const sendMessage = require('./sendMessage');

const validateUserActions = (dataItem, startGatherData) => {
	if (startGatherData) return false;

	if (_.isEmpty(dataItem)) {
		sendMessage({
			parse_mode: 'Markdown',
			message: { text: `Ошибка. Чтобы начать вводить показания отправьте в ответ на это сообщение слово *«начать»*` },
		});
		return true;
	}
	return false;
};

module.exports = validateUserActions;
