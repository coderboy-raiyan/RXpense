const transectionRouter = require('express').Router();
const {
    addTransition,
    getAllTransition,
    editTransection,
    deleteTransection,
} = require('./transition.controller');
const verifyJwt = require('../../middlewares/verifyJwt');

transectionRouter.get('/', verifyJwt, getAllTransition);
transectionRouter.post('/addTransection', verifyJwt, addTransition);
transectionRouter.put('/editTransection/:id', verifyJwt, editTransection);
transectionRouter.delete('/deleteTransection/:id', verifyJwt, deleteTransection);

module.exports = transectionRouter;
