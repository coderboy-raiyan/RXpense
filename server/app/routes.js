const router = require('express').Router();
const routes = require('../routes/root');

router.get('/', (req, res) => {
    res.send({ message: 'Success' });
});

router.use('/api/v1', routes);

module.exports = router;
