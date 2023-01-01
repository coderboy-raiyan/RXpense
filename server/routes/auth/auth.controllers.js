const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const createAsyncError = require('../../middlewares/createAsyncError');
const { accessToken, refreshToken } = require('../../libs/jwt');

// @desc Register
// @routes /api/v1/auth/register
// @access For register public users

const register = createAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(500).json({ message: 'All the Fields are required' });
    }

    const findEmail = await User.findOne({ email });

    if (findEmail) {
        return res.status(403).json({ message: 'User already exists go to login' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await new User({ name, email, password: hashPassword }).save();

    return res.status(200).json({ message: 'Registration successfully done' });
});

// @desc Login
// @routes /api/v1/auth/login
// @access For Login public users

const login = createAsyncError(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({ message: 'All the Fields are required' });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
        return res.status(403).json({ message: 'User not exists go to signup' });
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
        return res.status(403).json({ message: 'Password did not matched' });
    }

    const createdRefreshToken = refreshToken(findUser._doc._id);
    const createdAccessToken = accessToken(findUser._doc._id);

    res.cookie('refresh', createdRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 20000,
    });

    return res
        .status(200)
        .json({ accessToken: createdAccessToken, message: 'Logged in successfully' });
});

module.exports = { register, login };
