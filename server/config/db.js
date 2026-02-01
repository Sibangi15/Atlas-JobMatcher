const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/jobmatcher";
// mongoose.connect('mongodb://127.0.0.1:27017/JobMatcher', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });



const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;
