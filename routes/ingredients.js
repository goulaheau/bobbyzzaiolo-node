'use strict';

const router = require('express-promise-router')();

const IngredientsController = require('../controllers/ingredients');
const {
	      validateBody,
	      validateParam,
	      validateQuery,
	      schemas
      }                     = require('../helpers/router');

router.route('/')
	.get(validateQuery(schemas.partialIngredientSchema), IngredientsController.find)
	.post(validateBody(schemas.ingredientSchema), IngredientsController.save);

router.route('/:id')
	.get(validateParam(schemas.idSchema, 'id'), IngredientsController.find)
	.put([
			validateParam(schemas.idSchema, 'id'),
			validateBody(schemas.ingredientSchema)
		],
		IngredientsController.update
	)
	.patch([
			validateParam(schemas.idSchema, 'id'),
			validateBody(schemas.partialIngredientSchema)
		],
		IngredientsController.update
	)
	.delete(validateParam(schemas.idSchema, 'id'), IngredientsController.remove);

module.exports = router;