const authRouter = require('express').Router();
const { register, login, refresh, logout } = require('./auth.controllers');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/refresh', refresh);
authRouter.post('/logout', logout);

module.exports = authRouter;
