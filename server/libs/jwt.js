const jwt = require('jsonwebtoken');

function refreshToken(payload) {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
function accessToken(payload) {
    return jwt.sign({ _id: payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
}

function verifyJwtToken(token, secret) {
    return jwt.verify(token, secret, (error, isVerified) => {
        if (error) {
            return Promise.reject(error);
        }
        return isVerified;
    });
}

module.exports = { accessToken, refreshToken, verifyJwtToken };
