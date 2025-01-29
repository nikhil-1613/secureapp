import mongoose from "mongoose";

export async function connect() {
    try {
       await mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/secure-app-db");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        // console.error("Error connecting to MongoDB:", error);
        // throw new Error("Database connection failed");
    }

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB connection lost. Reconnecting...");
    });
}
