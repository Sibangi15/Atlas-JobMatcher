const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/jobmatcher";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;
