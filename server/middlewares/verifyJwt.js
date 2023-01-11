const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

async function verifyJwt(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'UnAuthorized' });
        }

        const token = authHeader.split(' ')[1];

        const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!verified) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        const findUser = await User.findOne({ _id: verified._id });

        req.user = findUser._id;
    } catch (error) {
        console.log(error);
    }
    next();
}
module.exports = verifyJwt;
