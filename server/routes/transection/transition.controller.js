const Transection = require('../../models/Transition.model');
const createAsyncError = require('../../middlewares/createAsyncError');

// @desc getAllTransition
// @routes GET - /api/v1/auth/transections
// @access Get All Transection

const getAllTransition = createAsyncError(async (req, res) => {
    const transection = await Transection.find({ userId: req?.user?._id }).populate(
        'userId',
        'name email',
    );
    res.status(200).json({ success: true, transections: transection });
});

// @desc addTransition
// @routes POST - /api/v1/auth/add-transection
// @access Add Transection

const addTransition = createAsyncError(async (req, res) => {
    const usersData = { ...req.body, userId: req?.user?._id };
    console.log(usersData);
    const addedTransection = new Transection(usersData);
    await addedTransection.save();
    res.status(200).json({ success: true, transection: addedTransection });
});

module.exports = { getAllTransition, addTransition };
