import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const db = mongoose.connection

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}

db.once("open", () => {
    console.log("Connected to MongoDB")
})

db.on("error", () => {
    console.log("Error connecting to MongoDB")
})