const _ = require('lodash');

const addUpdateValue = (item, data, value) => {
	const data_array = _.split(data, '__');
	item[data_array[0]] = item[data_array[0]] || {};
	item[data_array[0]][data_array[1]] = value;
};

module.exports = addUpdateValue;
