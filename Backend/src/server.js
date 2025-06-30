import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./Routes/note.route.js";
import authRoutes from "./Routes/auth.route.js";
import { connectDB } from "./utils/mongoDB.js";
import { corsOptions } from "./utils/corsOption.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
