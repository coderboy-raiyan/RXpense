const mongoose = require('mongoose');

const transitionSchema = mongoose.Schema(
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

const Transition = mongoose.model('transition', transitionSchema);

module.exports = Transition;
