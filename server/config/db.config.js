import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.ATLAS_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}