const mongoose = require('mongoose');

async function connectDb() {
    try {
        mongoose.set('strictQuery', true);
        // mongoose.set('strictPopulate', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb;
