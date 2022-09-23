const _ = require('lodash');

const removeInlineKeyboardItem = (inlineKeyboard, callbackQueryData) =>
	_.reduce(inlineKeyboard, (r, v) => (v[0]['callback_data'] === callbackQueryData ? r : [...r, v]), []);

module.exports = removeInlineKeyboardItem;
