const cors = require('cors');
const express = require('express');

const middlewares = [cors({ origin: ['http://localhost:3000'] }), express.json()];

module.exports = middlewares;
