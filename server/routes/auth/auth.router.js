const authRouter = require('express').Router();
const { register } = require('./auth.controllers');

authRouter.post('/register', register);

module.exports = authRouter;
