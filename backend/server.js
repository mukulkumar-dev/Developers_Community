import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import projectRoutes from "./routes/project.route.js";
import authRoutes from "./routes/auth.route.js";
import discussionRoutes from "./routes/discussion.route.js";

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend origin
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true, // Allow cookies or other credentials to be sent
}));

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/discussion", discussionRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})