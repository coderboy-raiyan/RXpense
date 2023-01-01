const mongoose = require('mongoose');

async function connectDb() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb://127.0.0.1:27017/expenseTracker');
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb;
