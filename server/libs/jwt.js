const jwt = require('jsonwebtoken');

function refreshToken(payload) {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20s' });
}
function accessToken(payload) {
    return jwt.sign({ _id: payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

module.exports = { accessToken, refreshToken };
