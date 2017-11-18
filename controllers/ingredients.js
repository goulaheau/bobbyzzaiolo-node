'use strict';

const Ingredient = require('../models/ingredient');

/**
 * Find all ingredients or one by his id.
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
		? await Ingredient.findById(id)
		: await Ingredient.find(!id ? request : {});

	if (ret) {
		res.status(200).json(ret);
	} else {
		res.status(204).end();
	}
}

/**
 * Save an ingredient.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function save(req, res, next) {
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function update(req, res, next) {
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
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
async function remove(req, res, next) {
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