import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const PORT = 8000;
const app = express();
connectDB();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(userRoute);

app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`));
