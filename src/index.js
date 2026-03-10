import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

const app = express();

dotenv.config({
    path:"./public/.env"
});

const startServer=async()=>{
    try {
        await connectDB();
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();