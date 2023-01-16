const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

function verifyJwt(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return res.status(404).json({ message: 'Authorization headers not found!!' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'UnAuthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, verified) => {
        if (error) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        User.findOne({ _id: verified._id }).then((foundUser) => {
            req.user = foundUser;
            next();
        });
    });
}
module.exports = verifyJwt;
