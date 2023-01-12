const router = require('express').Router();
const authRouter = require('./auth/auth.router');
const transectionRouter = require('./transection/transition.router');

router.use('/auth', authRouter);
router.use('/transections', transectionRouter);

module.exports = router;
