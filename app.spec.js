'use strict';

// Activate the test env to use an other database.
process.env.NODE_ENV = 'test';

// All the test files.
require('./controllers/ingredients.spec');
require('./controllers/pizzas.spec');