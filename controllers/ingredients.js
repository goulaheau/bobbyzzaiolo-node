'use strict';

const Ingredient = require('../models/ingredient');

/**
 * Ingredients' controller.
 *
 * @namespace IngredientController
 */

/**
 * Find all ingredients responding to the query or one by his id.
 *
 * @function find
 * @memberof IngredientController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Ingredient's ID to find.
 * @param {string} req.query.name - Ingredient's name to query.
 * @param {string} req.query.weight - Ingredient's weight to query.
 * @param {string} req.query.price - Ingredient's price to query.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function find(req, res) {
	const id = req.value
		? (req.value.params
			? req.value.params.id
			: null)
		: null;

	let request;

	if (!id) {
		request = req.value.query;
		for (let properties in request) {
			request[properties] = new RegExp(`^.*${request[properties]}.*$`, 'i');
		}
	}

	const ret = id
		? await Ingredient.findById(id)
		: await Ingredient.find(!id ? request : {});

	if (ret) {
		res.status(200).json(ret);
	} else {
		res.status(204).end();
	}
}

/**
 * Create an ingredient.
 *
 * @function create
 * @memberof IngredientController
 * @param {Object} req - Request object.
 * @param {Ingredient} req.body - Ingredient's object to create.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function save(req, res) {
	const ingredient = new Ingredient(req.value.body);

	const ret = await ingredient.save();

	if (ret) {
		res.status(201).json(ret);
		global.io.emit('[Ingredient] Created', ret);
	} else {
		res.status(500).end();
	}
}

/**
 * Update an ingredient.
 *
 * @function update
 * @memberof IngredientController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Ingredient's ID to update.
 * @param {Partial<Ingredient>} req.body - New values.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function update(req, res) {
	const { id } = req.value.params;
	const values = req.value.body;

	const ret = await Ingredient.findByIdAndUpdate(id, values, { new: true });

	if (ret) {
		res.status(200).json(ret);
		global.io.emit('[Ingredient] Updated', ret);
	} else {
		res.status(204).end();
	}
}

/**
 * Remove an ingredient.
 *
 * @function remove
 * @memberof IngredientController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Ingredient's ID to update.
 * @param {Partial<Ingredient>} req.body - New values.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function remove(req, res) {
	const { id } = req.value.params;

	const ingredient = await Ingredient.findById(id);

	const ret = await ingredient.remove();

	if (ret) {
		res.status(200).json(ret);
		global.io.emit('[Ingredient] Removed', ret);
	} else {
		res.status(204).end();
	}
}

module.exports = {
	find,
	save,
	update,
	remove
};