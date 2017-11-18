'use strict';

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const base64Img = require('base64-img');
const app       = require('../app');

const Pizza = require('../models/pizza');

chai.use(chaiHttp);
chai.should();

/**
 * All the tests for the Pizzas' routes.
 */
describe('Pizzas\' routes', () => {
	/**
	 * Clear the Pizzas' table.
	 */
	beforeEach(done => {
		Pizza.remove({}, () => done());
	});

	describe('GET /pizzas', () => {
		it('should find 0 pizzas', done => {
			chai.request(app)
				.get('/pizzas')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('POST /pizzas', () => {
		it('should not create a pizza without description', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = {
					name       : 'Olives à la pizza',
					price      : 10,
					image      : data,
					ingredients: []
				};

				chai.request(app)
					.post('/pizzas')
					.send(pizza)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.details[0].message.should.be.eql(
							'"description" is required');
						done();
					});
			});
		});

		it('should create a pizza', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = {
					name       : 'Olives à la pizza',
					description: 'Pizza avec toutes sortes d\'olives.',
					price      : 10,
					image      : data,
					ingredients: []
				};

				chai.request(app)
					.post('/pizzas')
					.send(pizza)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.have.property('_id');
						res.body.name.should.be.eql('Olives à la pizza');
						res.body.description.should.be.eql(
							'Pizza avec toutes sortes d\'olives.');
						res.body.price.should.be.eql(10);
						res.body.image.should.be.eql(data);
						res.body.ingredients.length.should.be.eql(0);
						done();
					});
			});
		});
	});

	describe('GET /pizzas/:id', () => {
		it('should find a pizza by the given id', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = new Pizza({
					name       : 'Pizza aux olives dénoyautées',
					description: 'Pizza avec des olives dénoyautées.',
					price      : 7.5,
					image      : data,
					ingredients: []
				});

				pizza.save((err, pizza) => {
					chai.request(app)
						.get(`/pizzas/${pizza._id}`)
						.send(pizza)
						.end((err, res) => {
							res.should.have.status(200);
							res.body._id.should.be.eql(`${pizza._id}`);
							res.body.name.should.be.eql('Pizza aux olives dénoyautées');
							res.body.description.should.be.eql(
								'Pizza avec des olives dénoyautées.');
							res.body.price.should.be.eql(7.5);
							res.body.image.should.be.eql(data);
							res.body.ingredients.length.should.be.eql(0);
							done();
						});
				});
			});
		});
	});

	describe('PUT /pizzas/:id', () => {
		it('should update an pizza by the given id', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = new Pizza({
					name       : 'izza aux olives noires',
					description: 'Pizza avec des olives noires.',
					price      : 7.5,
					image      : data,
					ingredients: []
				});
				pizza.save((err, pizza) => {
					chai.request(app)
						.put(`/pizzas/${pizza._id}`)
						.send({
							name       : 'Pizza aux olives noires',
							description: 'Pizza avec des olives noires.',
							price      : 7.5,
							image      : data,
							ingredients: []
						})
						.end((err, res) => {
							res.should.have.status(200);
							res.body._id.should.be.eql(`${pizza._id}`);
							res.body.name.should.be.eql('Pizza aux olives noires');
							res.body.description.should.be.eql(
								'Pizza avec des olives noires.');
							res.body.price.should.be.eql(7.5);
							res.body.image.should.be.eql(data);
							res.body.ingredients.length.should.be.eql(0);
							done();
						});
				});
			});
		});
	});

	describe('PATCH /pizzas/:id', () => {
		it('should update an pizza by the given id', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = new Pizza({
					name       : 'izza aux olives vertes',
					description: 'Pizza avec des olives vertes.',
					price      : 7.5,
					image      : data,
					ingredients: []
				});
				pizza.save((err, pizza) => {
					chai.request(app)
						.patch(`/pizzas/${pizza._id}`)
						.send({
							name: 'Pizza aux olives vertes'
						})
						.end((err, res) => {
							res.should.have.status(200);
							res.body._id.should.be.eql(`${pizza._id}`);
							res.body.name.should.be.eql('Pizza aux olives vertes');
							res.body.description.should.be.eql(
								'Pizza avec des olives vertes.');
							res.body.price.should.be.eql(7.5);
							res.body.image.should.be.eql(data);
							res.body.ingredients.length.should.be.eql(0);
							done();
						});
				});
			});
		});
	});

	describe('DELETE /pizzas/:id', () => {
		it('should delete an pizza by the given id', done => {
			base64Img.base64('asserts/pizzas/olives-a-la-pizza.jpg', (err, data) => {
				let pizza = new Pizza({
					name       : 'Pizza aux olives pimentées',
					description: 'Pizza avec des olives pimentées.',
					price      : 7.5,
					image      : data,
					ingredients: []
				});
				pizza.save((err, pizza) => {
					chai.request(app)
						.delete(`/pizzas/${pizza._id}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body._id.should.be.eql(`${pizza._id}`);
							res.body.name.should.be.eql('Pizza aux olives pimentées');
							res.body.description.should.be.eql(
								'Pizza avec des olives pimentées.');
							res.body.price.should.be.eql(7.5);
							res.body.image.should.be.eql(data);
							res.body.ingredients.length.should.be.eql(0);
							done();
						});
				});
			});
		});
	});
});