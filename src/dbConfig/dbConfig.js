import mongoose from "mongoose";

export async function connect() {
    if (mongoose.connection.readyState) {
        console.log("Already connected to the database");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL||"mongodb+srv://nikhil:secure1613@cluster0.fmpfn.mongodb.net/secure-app-db");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB connection lost. Reconnecting...");
    });
}
