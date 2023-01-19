const moment = require('moment');
const Transection = require('../../models/Transition.model');
const createAsyncError = require('../../middlewares/createAsyncError');

// @desc getAllTransition
// @routes GET - /api/v1/auth/transections
// @access Get All Transection

const getAllTransition = createAsyncError(async (req, res) => {
    const { frequency, type } = req.query;

    const transection = await Transection.find({
        userId: req?.user?._id,
        date: {
            $gt: moment().subtract(Number(frequency), 'd').toDate(),
        },
        ...(type !== 'all' && { type }),
    })
        .populate('userId', 'name email')
        .sort('-date');

    return res.status(200).json({ success: true, transections: transection });
});

// @desc addTransition
// @routes POST - /api/v1/auth/add-transection
// @access Add Transection

const addTransition = createAsyncError(async (req, res) => {
    const usersData = { ...req.body, userId: req?.user?._id };

    const addedTransection = new Transection(usersData);

    await addedTransection.save();

    return res.status(200).json({ success: true, transection: addedTransection });
});

module.exports = { getAllTransition, addTransition };
