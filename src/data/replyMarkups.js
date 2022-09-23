const replyMarkups = {
	initialServicesOptions: [
		[{ text: 'Горячая вода, ул. Октябрьская 33/37', callback_data: 'oktyabrskaya_street__hot_water' }],
		[{ text: 'Холодная вода, ул. Октябрьская 33/37', callback_data: 'oktyabrskaya_street__cold_water' }],
		[{ text: 'Электричество, ул. Октябрьская 33/37', callback_data: 'oktyabrskaya_street__electricity' }],
		[{ text: 'Холодная вода, ул. Ленина 51', callback_data: 'lenina_street__cold_water' }],
		[{ text: 'Газоснабжение, ул. Ленина 51', callback_data: 'lenina_street__gas' }],
		[{ text: 'Электричество, ул. Ленина 51', callback_data: 'lenina_street__electricity' }],
		[{ text: 'Мобильный телефон, +375(29)9475013', callback_data: 'other__mobile_phone' }],
		[{ text: 'Интернет (Byfly)', callback_data: 'other__internet' }],
		[{ text: 'Единый налог', callback_data: 'other__single_tax' }],
		[{ text: 'СКНО', callback_data: 'other__skno' }],
	],
	statusOptions: [
		[{ text: 'Все верно', callback_data: 'submit_data_values' }],
		[{ text: 'Есть ошибка', callback_data: 'update_data_value' }],
	],
	yesNoOptions: [
		[{ text: 'Да', callback_data: 'update_data_value' }],
		[{ text: 'Нет', callback_data: 'send_gathered_data' }],
	],
	reminderOptions: [
		[{ text: 'Подать данные сейчас', callback_data: 'start_gather_data' }],
		[{ text: 'Напомнить о подаче завтра', callback_data: 'gather_data_later' }],
	],
};

module.exports = replyMarkups;
