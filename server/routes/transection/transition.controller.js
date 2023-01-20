const moment = require('moment');
const Transection = require('../../models/Transition.model');
const createAsyncError = require('../../middlewares/createAsyncError');

// @desc getAllTransition
// @routes GET - /api/v1/transections
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
// @routes POST - /api/v1/transections/addTransection
// @access Add Transection

const addTransition = createAsyncError(async (req, res) => {
    const usersData = { ...req.body, userId: req?.user?._id };

    const addedTransection = new Transection(usersData);

    await addedTransection.save();

    return res.status(200).json({ success: true, transection: addedTransection });
});
// @desc editTransection
// @routes POST - /api/v1/transections/editTransection
// @access Add Transection

const editTransection = createAsyncError(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTransection = await Transection.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json({ success: true, transection: updatedTransection });
    } catch (error) {
        console.log(error);
    }
});

module.exports = { getAllTransition, addTransition, editTransection };
