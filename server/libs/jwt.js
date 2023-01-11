const jwt = require('jsonwebtoken');

function refreshToken(payload) {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
function accessToken(payload) {
    return jwt.sign({ _id: payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

async function verifyJwtToken(token, secret) {
    const isVerified = await jwt.verify(token, secret);
    return isVerified;
}

module.exports = { accessToken, refreshToken, verifyJwtToken };
