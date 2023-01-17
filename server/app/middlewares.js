const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const middlewares = [
    cors({
        origin: ['http://localhost:3000', 'https://expense-tracker-tawny-ten.vercel.app'],
        credentials: true,
    }),
    express.json(),
    cookieParser(),
    morgan('dev'),
];

module.exports = middlewares;
