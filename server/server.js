const http = require('http');
const app = require('./app/app');
const connectDb = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDb();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Listening on port...');
});
