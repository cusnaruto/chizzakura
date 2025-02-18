const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://admin:secret@localhost:27017/messagesDB?authSource=admin";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};

module.exports = connectMongoDB;