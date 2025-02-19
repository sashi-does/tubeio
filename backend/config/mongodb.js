import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();


export const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Database connection failed");
    }
}

export default mongoDB