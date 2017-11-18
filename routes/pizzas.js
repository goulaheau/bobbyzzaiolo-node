'use strict';

const router = require('express-promise-router')();

const PizzasController = require('../controllers/pizzas');

const {
	      validateParam,
	      validateBody,
	      validateQuery,
	      schemas
      } = require('../helpers/router');

router.route('/')
      .get(validateQuery(schemas.partialPizzaSchema), PizzasController.find)
      .post(validateBody(schemas.pizzaSchema), PizzasController.create);

router.route('/:id')
      .get(validateParam(schemas.idSchema, 'id'), PizzasController.find)
      .put([
		      validateParam(schemas.idSchema, 'id'),
		      validateBody(schemas.pizzaSchema)
	      ],
	      PizzasController.update
      )
      .patch([
		      validateParam(schemas.idSchema, 'id'),
		      validateBody(schemas.partialPizzaSchema)
	      ],
	      PizzasController.update
      )
      .delete(validateParam(schemas.idSchema, 'id'), PizzasController.remove);

module.exports = router;