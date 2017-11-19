'use strict';

const Pizza = require('../models/pizza');

/**
 * Pizzas' controller.
 * @namespace PizzaController
 */

/**
 * Find all pizzas responding to the query or one by his id.
 *
 * @function find
 * @memberof PizzaController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Pizza's ID to find.
 * @param {string} req.query.name - Pizza's name to query.
 * @param {string} req.query.description - Pizza's description to query.
 * @param {string} req.query.price - Pizza's price to query.
 * @param {string} req.query.image - Pizza's image to query.
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
		? await Pizza.findById(id).populate('ingredients')
		: await Pizza.find(!id ? request : {}).populate('ingredients');

	if (ret) {
		res.status(200).json(ret);
	} else {
		res.status(204).end();
	}
}

/**
 * Create a pizza.
 *
 * @function create
 * @memberof PizzaController
 * @param {Object} req - Request object.
 * @param {Pizza} req.body - Pizza's object to create.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function create(req, res) {
	const pizza = new Pizza(req.value.body);

	const ret = await Pizza.populate(await pizza.save(), 'ingredients');

	if (ret) {
		res.status(201).json(ret);
		global.io.emit('[Pizza] Created', ret);
	} else {
		res.status(500).end();
	}
}

/**
 * Update a pizza.
 *
 * @function update
 * @memberof PizzaController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Pizza's ID to update.
 * @param {Partial<Pizza>} req.body - New values.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function update(req, res) {
	const { id } = req.value.params;
	const values = req.value.body;

	const ret = await Pizza.findByIdAndUpdate(id, values, { new: true })
		.populate('ingredients');

	if (ret) {
		res.status(200).json(ret);
		global.io.emit('[Pizza] Updated', ret);
	} else {
		res.status(204).end();
	}
}

/**
 * Remove a pizza.
 *
 * @function remove
 * @memberof PizzaController
 * @param {Object} req - Request object.
 * @param {string} req.params.id - Pizza's ID to update.
 * @param {Partial<Pizza>} req.body - New values.
 * @param {Object} res - Response object.
 * @returns {Promise.<void>} Call res.status() with a status code to say what happens and res.json() to send data if there is any.
 */
async function remove(req, res) {
	const { id } = req.value.params;

	const pizza = await Pizza.findById(id);

	const ret = await Pizza.populate(await pizza.remove(), 'ingredients');

	if (ret) {
		res.status(200).json(ret);
		global.io.emit('[Pizza] Removed', ret);
	} else {
		res.status(204).end();
	}
}

module.exports = {
	find,
	create,
	update,
	remove
};