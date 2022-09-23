require('dotenv').config();

const _ = require('lodash');
const axios = require('axios');
const express = require('express');
const { CronTime } = require('cron');
const bodyParser = require('body-parser');

const saveData = require('./src/data/gatheredData');
const formatData = require('./src/utils/formatData');
const sendMessage = require('./src/utils/sendMessage');
const replyMarkups = require('./src/data/replyMarkups');
const replyMessages = require('./src/data/replyMessages');
const addUpdateValue = require('./src/utils/addUpdateValue');
const remindGatherData = require('./src/utils/remindGatherData');
const validateUserActions = require('./src/utils/validateUserActions');
const sendDataToAnotherChat = require('./src/utils/sendDataToAnotherChat');
const removeInlineKeyboardItem = require('./src/utils/removeInlineKeyboardItem');
const sendCurrentServicesOptions = require('./src/utils/sendCurrentServicesOptions');

const { TOKEN, SERVER_URL } = process.env;
const URI = `/webhook/${TOKEN}`;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const app = express();
app.use(bodyParser.json());

remindGatherData.start();

let gatheredDataItem = {};
let currCallbackQuery = '';
let startGatherData = false;
let updateDataValue = false;
let serviceOptionTriggered = false;
let currentServicesOptions = replyMarkups.initialServicesOptions;

app.post(URI, (req, res) => {
	const { callback_query, message } = req.body;
	if (callback_query) {
		const { data } = callback_query;
		currCallbackQuery = data;
		switch (currCallbackQuery) {
			case 'start_gather_data':
				sendCurrentServicesOptions(currCallbackQuery, currentServicesOptions);
				startGatherData = true;
				break;
			case 'update_data_value':
				if (validateUserActions(gatheredDataItem, startGatherData)) break;
				sendCurrentServicesOptions(currCallbackQuery, currentServicesOptions);
				updateDataValue = true;
				break;
			case 'gather_data_later':
				remindGatherData.setTime(new CronTime('0 22 17 21 * *'));
				break;
			case 'submit_data_values':
				if (validateUserActions(gatheredDataItem, startGatherData)) break;
				saveData(gatheredDataItem);
				sendDataToAnotherChat(gatheredDataItem);
				gatheredDataItem = {};
				sendMessage({ message: { text: replyMessages[currCallbackQuery] } });
				break;
			case 'send_gathered_data':
				if (validateUserActions(gatheredDataItem, startGatherData)) break;
				sendMessage({
					parse_mode: 'Markdown',
					message: { text: `Спасибо! Проверьте обновленные данные. \n\n${formatData(gatheredDataItem, ':\n', '*')}` },
					reply_markup: JSON.stringify({ inline_keyboard: replyMarkups.statusOptions }),
				});
				break;
			case 'oktyabrskaya_street__electricity':
			case 'oktyabrskaya_street__cold_water':
			case 'oktyabrskaya_street__hot_water':
			case 'lenina_street__electricity':
			case 'lenina_street__cold_water':
			case 'lenina_street__gas':
			case 'other__mobile_phone':
			case 'other__single_tax':
			case 'other__internet':
			case 'other__skno':
				if (validateUserActions(gatheredDataItem, startGatherData)) break;
				serviceOptionTriggered = true;
				sendMessage({ message: { text: replyMessages[currCallbackQuery] } });
				break;
			default:
				break;
		}
	} else if (message) {
		const { text } = message;

		if (_.lowerCase(text) === 'начать') {
			currCallbackQuery = 'start_gather_data';
			sendCurrentServicesOptions(currCallbackQuery, currentServicesOptions);
			startGatherData = true;
			return;
		}

		if (serviceOptionTriggered) {
			addUpdateValue(gatheredDataItem, currCallbackQuery, message.text);

			if (startGatherData) {
				currentServicesOptions = removeInlineKeyboardItem(currentServicesOptions, currCallbackQuery);
			}

			if (_.isEmpty(currentServicesOptions)) {
				sendMessage({
					parse_mode: 'Markdown',
					message: { text: `Спасибо! Проверьте введенные данные. \n\n${formatData(gatheredDataItem, ':\n', '*')}` },
					reply_markup: JSON.stringify({ inline_keyboard: replyMarkups.statusOptions }),
				});
				startGatherData = false;
				updateDataValue = false;
				currentServicesOptions = replyMarkups.initialServicesOptions;
			}

			if (updateDataValue) {
				sendMessage({
					message: { text: `Показание успешно изменено! Хотите изменить показания по другим услугам?` },
					reply_markup: JSON.stringify({ inline_keyboard: replyMarkups.yesNoOptions }),
				});
				updateDataValue = false;
			}

			if (startGatherData) {
				sendMessage({
					message: { text: `Спасибо! Введите показания по оставшимся ${currentServicesOptions.length} услугам` },
					reply_markup: JSON.stringify({ inline_keyboard: currentServicesOptions }),
				});
			}

			serviceOptionTriggered = false;
		}
	}

	return res.send();
});

const init = async () => {
	const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${SERVER_URL}${URI}`);
	console.log(res.data);
};

app.listen(process.env.PORT || 5000, async () => {
	console.log('🚀 app running on port', process.env.PORT || 5000);
	await init();
});
