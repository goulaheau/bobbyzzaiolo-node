'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Ingredient's model
 *
 * @namespace IngredientModel
 * @property {string} name - Ingredient's name.
 * @property {string} name.required - The property is required.
 * @property {string} name.unique - The property is unique.
 * @property {string} weight - Ingredient's weight.
 * @property {string} weight.required - The property is required.
 * @property {string} price - Ingredient's price.
 * @property {string} price.required - The property is required.
 */

const ingredientSchema = new Schema({
	name  : {
		type    : String,
		required: true,
		unique  : true
	},
	weight: {
		type    : String,
		required: true
	},
	price : {
		type    : String,
		required: true
	}
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;