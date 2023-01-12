const mongoose = require('mongoose');

const transectionSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
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
