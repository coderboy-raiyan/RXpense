const transectionRouter = require('express').Router();
const { addTransition, getAllTransition } = require('./transition.controller');
const verifyJwt = require('../../middlewares/verifyJwt');

transectionRouter.get('/:id', verifyJwt, getAllTransition);
transectionRouter.post('/addTransection', verifyJwt, addTransition);

module.exports = transectionRouter;
