const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const createAsyncError = require('../../middlewares/createAsyncError');
const { accessToken, refreshToken, verifyJwtToken } = require('../../libs/jwt');

// @desc Register
// @routes POST - /api/v1/auth/register
// @access For register public users

const register = createAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(500).json({ success: false, message: 'All the Fields are required' });
    }

    const findEmail = await User.findOne({ email });

    if (findEmail) {
        return res.status(403).json({ success: false, message: 'User already exists go to login' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

    const createdRefreshToken = refreshToken(newUser._doc._id);
    const createdAccessToken = accessToken(newUser._doc._id);

    res.cookie('refresh', createdRefreshToken, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        ...newUser._doc,
        password: null,
        accessToken: createdAccessToken,
        message: 'Registration done',
    });
});

// @desc Login
// @routes POST - /api/v1/auth/login
// @access For Login public users

const login = createAsyncError(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All the Fields are required' });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
        return res.status(403).json({ success: false, message: 'User not exists go to signup' });
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
        return res.status(403).json({ success: false, message: 'Password did not matched' });
    }

    const createdRefreshToken = refreshToken(findUser._doc._id);
    const createdAccessToken = accessToken(findUser._doc._id);

    res.cookie('refresh', createdRefreshToken, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        ...findUser._doc,
        password: null,
        accessToken: createdAccessToken,
        message: 'Logged in successfully',
    });
});

// @desc Refresh
// @routes GET - /api/v1/auth/refresh
// @access get a new access token for the user

const refresh = createAsyncError(async (req, res) => {
    const { refresh } = req.cookies;
    console.log(refresh);
    if (!refresh) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const isVerified = await verifyJwtToken(refresh, process.env.REFRESH_TOKEN_SECRET);

    if (!isVerified) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const findUser = await User.findOne({ _id: isVerified._id });

    if (!findUser) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const newAccessToken = accessToken(findUser._doc._id);

    return res
        .status(200)
        .json({ success: true, accessToken: newAccessToken, ...findUser._doc, password: null });
});

// @desc Logout
// @routes POST - /api/v1/auth/logout
// @access Logout user and clear cookies

const logout = createAsyncError(async (req, res) => {
    const { refresh } = req.cookies;

    if (!refresh) {
        return res.statusCode(200);
    }

    res.clearCookie('refresh', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });

    return res.status(200).json({ success: true, message: 'Cookie has been cleared' });
});

module.exports = {
    logout,
    register,
    login,
    refresh,
};
