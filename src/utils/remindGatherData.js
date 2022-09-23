const { CronJob } = require('cron');

const sendMessage = require('./sendMessage');
const replyMarkups = require('../data/replyMarkups');

const remindGatherData = new CronJob('0 56 17 23 * *', async function () {
	sendMessage({
		message: { text: 'Сегодня 21 сентября. Необходимо платить за коммунальные. \n\nВыберите опцию' },
		reply_markup: JSON.stringify({ inline_keyboard: replyMarkups.reminderOptions }),
	});
});

module.exports = remindGatherData;
