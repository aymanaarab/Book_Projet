import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import clientRoute from "./routes/Client.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3001;
const connectionString = process.env.MONGODB || "mongodb://0.0.0.0:27017/";

app.listen(port, () => console.log("/Client - server connected"));
mongoose
  .connect(connectionString + "Client")
  .then(() => console.log("database connected"));

app.use("/api", clientRoute);
