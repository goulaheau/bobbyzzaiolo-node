'use strict';

const express    = require('express');
const logger     = require('morgan');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
const config     = require('config');

const helperView  = require('./helpers/view');
const pizzas      = require('./routes/pizzas');
const ingredients = require('./routes/ingredients');

const app = express();

// Create a server for socket.io.
const server = require('http').Server(app);
const io     = require('socket.io')(server);

// Connection to mongodb.
mongoose.connect(config.DBHost, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Middlewares.
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));

// Routes.
app.use('/pizzas', pizzas);
app.use('/ingredients', ingredients);

// Catch 404 Errors and forward them to error handler.
app.use((req, res, next) => {
	const err  = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler functions.
app.use((err, req, res, next) => {
	const error  = app.get('env') === 'development' ? err : {};
	const status = err.status || 500;

	// Respond to client.
	res.status(status)
		.json({
			error: {
				message: error.message
			}
		});

	// Respond to ourselves.
	console.error(err);
});

// Start the server.
server.listen(helperView.port,
	() => console.log(`Server is listening on port ${helperView.port}`));

// Allow to use io in controllers files.
global.io = io;

module.exports = app;