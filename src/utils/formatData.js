const _ = require('lodash');

const russTranslation = require('../data/russTranslation');

const formatData = (item, p, l) =>
	_.reduce(
		item,
		(r, v, k) => `${r} ${l}${russTranslation[k]}${l}${p}${_.isObject(v) ? formatData(v, ' - ', '') : v} \n`,
		''
	);

module.exports = formatData;
