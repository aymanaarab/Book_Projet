import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bookRoute from "./routes/Book.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB || "mongodb://0.0.0.0:27017/";

app.listen(port, () => console.log("/Book - server connected"));
mongoose
  .connect(connectionString + "Book")
  .then(() => console.log("database connected"));

app.use("/api", bookRoute);
