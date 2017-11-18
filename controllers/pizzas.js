'use strict';

const Pizza = require('../models/pizza');

/**
 * Find all pizzas or one by his id.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function find(req, res, next) {
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function create(req, res, next) {
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function update(req, res, next) {
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function remove(req, res, next) {
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