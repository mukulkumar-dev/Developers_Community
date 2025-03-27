import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend origin
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow cookies or other credentials to be sent
  }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})