const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

const configureDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected To DB');
    }
    catch (err) {
        console.log('connection fails');
        process.exit(1)
    }
}

module.exports = configureDB;

