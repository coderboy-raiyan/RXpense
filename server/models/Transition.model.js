const mongoose = require('mongoose');

const transectionSchema = mongoose.Schema(
    {
        amount: {
            type: String,
            required: [true, 'Amount is required'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        description: {
            type: String,
        },
        reference: {
            type: String,
        },
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Transection = mongoose.model('transection', transectionSchema);

module.exports = Transection;
