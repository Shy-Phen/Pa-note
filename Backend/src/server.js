import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./Routes/note.route.js";
import authRoutes from "./Routes/auth.route.js";
import { connectDB } from "./utils/mongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/notes", noteRoutes);
app.use("/api/users", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
