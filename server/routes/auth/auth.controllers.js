const bcrypt = require('bcryptjs');
const createAsyncError = require('../../middlewares/createAsyncError');
const User = require('../../models/User.model');

const register = createAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(500).json({ message: 'All the Fields are required' });
    }

    const findEmail = await User.findOne({ email });

    if (findEmail) {
        return res.status(403).json({ message: 'User already exists go to login' });
    }

    const hashPassword = bcrypt.hash(password, 10);

    await new User({ name, email, password: hashPassword }).save();

    return res.status(200).json({ message: 'Registration successfully done' });
});

module.exports = { register };
