const app = require('express')();
const { notFound, globalErrorHandler } = require('./error');
const middlewares = require('./middlewares');
const routes = require('./routes');

// middlewares
app.use(middlewares);

// routes
app.get('/health', (req, res) => res.status(200).json({ message: 'Working fine' }));

app.use(routes);

// errorHandlers
app.use([notFound, globalErrorHandler]);

module.exports = app;
