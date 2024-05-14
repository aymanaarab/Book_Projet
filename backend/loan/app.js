import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import loanRoute from "./routes/Loan.js";
import { connect } from "amqplib";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3002;
const connectionString = process.env.MONGODB || "mongodb://127.0.0.1:27017/";

app.listen(port, () => console.log("/Loan - server connected"));
mongoose
  .connect(connectionString + "Loan")
  .then(() => console.log("database connected"));

app.use("/api", loanRoute);
