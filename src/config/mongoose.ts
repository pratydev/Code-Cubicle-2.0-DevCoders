import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/codecubicle";

async function connectToDB(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDB();

const db = mongoose.connection;

db.on("error", (error)=>{
    console.error("MongoDB connection error:", error);
});

export default db;