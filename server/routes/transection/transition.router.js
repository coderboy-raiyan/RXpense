const transectionRouter = require('express').Router();
const { addTransition, getAllTransition, editTransection } = require('./transition.controller');
const verifyJwt = require('../../middlewares/verifyJwt');

transectionRouter.get('/', verifyJwt, getAllTransition);
transectionRouter.post('/addTransection', verifyJwt, addTransition);
transectionRouter.post('/editTransection/:id', verifyJwt, editTransection);

module.exports = transectionRouter;
