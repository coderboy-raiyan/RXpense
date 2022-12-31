const router = require('express').Router();
const routes = require('../routes/root');

router.use('/api/v1', routes);

module.exports = router;
