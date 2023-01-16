const Transection = require('../../models/Transition.model');
const createAsyncError = require('../../middlewares/createAsyncError');

// @desc getAllTransition
// @routes GET - /api/v1/auth/transections
// @access Get All Transection

const getAllTransition = createAsyncError(async (req, res) => {
    // const transection = await Transection.find({});
    res.status(200).json({ success: true, transections: 'ok' });
});

// @desc addTransition
// @routes POST - /api/v1/auth/add-transection
// @access Add Transection

const addTransition = createAsyncError(async (req, res) => {
    const usersData = { ...req.body, amount: +req.body.amount, userId: req?.user?._id };
    const addedTransection = new Transection(usersData);
    await addedTransection.save();
    res.status(200).json({ success: true, transection: addedTransection });
});

module.exports = { getAllTransition, addTransition };
