const transectionRouter = require('express').Router();
const { addTransition, getAllTransition } = require('./transition.controller');

transectionRouter.get('/', getAllTransition);
transectionRouter.post('/add-transition', addTransition);

module.exports = transectionRouter;
