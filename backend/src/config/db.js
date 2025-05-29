const mongoose = require('mongoose');

const mongoURI = require('./config').mongoURI
console.log(mongoURI);


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);     
    }
}

module.exports = connectDB