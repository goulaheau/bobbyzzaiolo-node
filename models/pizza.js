'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pizzaSchema = new Schema({
	name       : {
		type    : String,
		required: true,
		unique  : true
	},
	description: {
		type    : String,
		required: true
	},
	price      : {
		type    : String,
		required: true
	},
	image      : {
		type    : String,
		required: true
	},
	ingredients: [
		{
			type: Schema.Types.ObjectId,
			ref : 'ingredient'
		}
	]
}, {
	timestamps: true // createdAt and updatedAt fields.
});

const Pizza = mongoose.model('pizza', pizzaSchema);

module.exports = Pizza;