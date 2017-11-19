'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Pizza's model
 *
 * @namespace PizzaModel
 * @property {string} name - Pizza's name.
 * @property {string} name.required - The property is required.
 * @property {string} name.unique - The property is unique.
 * @property {string} description - Pizza's description.
 * @property {string} description.required - The property is required.
 * @property {string} price - Pizza's price.
 * @property {string} price.required - The property is required.
 * @property {string} image - Pizza's image.
 * @property {string} image.required - The property is required.
 * @property {Ingredient[]} ingredients - Pizza's ingredients.
 */

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