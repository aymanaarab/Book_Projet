import express from "express";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
  upload,
} from "../controllers/Book.js";
import authMiddleware from "../../client/middlewares/Client.js";

const route = express.Router();

route.get("/", authMiddleware, getBooks);
route.get("/:id", getBookById);
route.delete("/delete-book/:id", authMiddleware, deleteBook);
route.post("/add-book", authMiddleware, upload.single("image"), addBook);
route.put(
  "/update-book/:id",
  authMiddleware,
  upload.single("image"),
  updateBook
);

export default route;
