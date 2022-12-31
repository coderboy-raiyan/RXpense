const cors = require('cors');

const middlewares = [cors({ origin: ['http://localhost:3000'] })];

module.exports = middlewares;
