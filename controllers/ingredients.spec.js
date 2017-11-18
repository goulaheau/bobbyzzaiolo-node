'use strict';

const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../app');

const Ingredient = require('../models/ingredient');

chai.use(chaiHttp);
chai.should();

/**
 * All the tests for the Ingredients' routes.
 */
describe('Ingredients\'s routes', () => {
	/**
	 * Clear the Ingredients' table.
	 */
	beforeEach(done => {
		Ingredient.remove({}, () => done());
	});

	describe('GET /ingredients', () => {
		it('should find 0 ingredients', done => {
			chai.request(app)
				.get('/ingredients')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('POST /ingredients', () => {
		it('should not create an ingredient without weight', done => {
			let ingredient = {
				name : 'Olives noires',
				price: 1
			};

			chai.request(app)
				.post('/ingredients')
				.send(ingredient)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.details[0].message.should.be.eql('"weight" is required');
					done();
				});
		});

		it('should create an ingredient', done => {
			let ingredient = {
				name  : 'Olives noires',
				weight: '10 olives',
				price : 1
			};

			chai.request(app)
				.post('/ingredients')
				.send(ingredient)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property('_id');
					res.body.name.should.be.eql('Olives noires');
					res.body.weight.should.be.eql('10 olives');
					res.body.price.should.be.eql(1);
					done();
				});
		});
	});

	describe('GET /ingredients/:id', () => {
		it('should find an ingredient by the given id', done => {
			let ingredient = new Ingredient({
				name  : 'Olives vertes',
				weight: '10 olives',
				price : 1
			});

			ingredient.save((err, ingredient) => {
				chai.request(app)
					.get(`/ingredients/${ingredient._id}`)
					.send(ingredient)
					.end((err, res) => {
						res.should.have.status(200);
						res.body._id.should.be.eql(`${ingredient._id}`);
						res.body.name.should.be.eql('Olives vertes');
						res.body.weight.should.be.eql('10 olives');
						res.body.price.should.be.eql(1);
						done();
					});
			});
		});
	});

	describe('PUT /ingredients/:id', () => {
		it('should update an ingredient by the given id', done => {
			let ingredient = new Ingredient({
				name  : 'lives noires dénoyautées',
				weight: '10 olives',
				price : 1.5
			});
			ingredient.save((err, ingredient) => {
				chai.request(app)
					.put(`/ingredients/${ingredient._id}`)
					.send({
						name  : 'Olives noires dénoyautées',
						weight: '10 olives',
						price : 1.5
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body._id.should.be.eql(`${ingredient._id}`);
						res.body.name.should.be.eql('Olives noires dénoyautées');
						res.body.weight.should.be.eql('10 olives');
						res.body.price.should.be.eql(1.5);
						done();
					});
			});
		});
	});

	describe('PATCH /ingredients/:id', () => {
		it('should update an ingredient by the given id', done => {
			let ingredient = new Ingredient({
				name  : 'lives vertes dénoyautées',
				weight: '10 olives',
				price : 1.5
			});
			ingredient.save((err, ingredient) => {
				chai.request(app)
					.patch(`/ingredients/${ingredient._id}`)
					.send({
						name: 'Olives vertes dénoyautées'
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body._id.should.be.eql(`${ingredient._id}`);
						res.body.name.should.be.eql('Olives vertes dénoyautées');
						res.body.weight.should.be.eql('10 olives');
						res.body.price.should.be.eql(1.5);
						done();
					});
			});
		});
	});

	describe('DELETE /ingredients/:id', () => {
		it('should delete an ingredient by the given id', done => {
			let ingredient = new Ingredient({
				name  : 'Olives pimentées',
				weight: '10 olives',
				price : 1.5
			});
			ingredient.save((err, ingredient) => {
				chai.request(app)
					.delete(`/ingredients/${ingredient._id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body._id.should.be.eql(`${ingredient._id}`);
						res.body.name.should.be.eql('Olives pimentées');
						res.body.weight.should.be.eql('10 olives');
						res.body.price.should.be.eql(1.5);
						done();
					});
			});
		});
	});
});