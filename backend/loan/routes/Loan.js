import express from "express";
import {
  addLoan,
  getClientLoansById,
  getLoans,
  getloanById,
  returnBook,
  returnBooks,
} from "../controllers/Loan.js";
import authMiddleware from "../middlewares/Client.js";

const route = express.Router();

route.get("/", getLoans);
route.get("/:id", authMiddleware, getloanById);
route.get("/loans/:id", authMiddleware, getClientLoansById);
route.post("/add-loan", authMiddleware, addLoan);
route.post("/return-book", authMiddleware, returnBook);
route.get("/return-all-book/:id", authMiddleware, returnBooks);

export default route;
