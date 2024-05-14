import multer from "multer";
import Book from "../models/Book.js";
import { sendMessageToQueue } from "../utils/broker.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const addBook = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const book = req.body;
    console.log(req.file?.path);

    if (req.file) {
      book.image = req.file?.path;
    }

    const createdBook = await Book.create(book);
    console.log("New book created:", createdBook);
    jsonRes.data = createdBook;
    res.status(202).json(jsonRes);
    const messageContent = JSON.stringify(createdBook);
    await sendMessageToQueue("bookAdded", messageContent);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
export const getBooks = async (req, res) => {
  try {
    let books = await Book.find();

    let jsonRes = { message: "success", data: books };

    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    let books = await Book.findOne({ _id: id });

    let jsonRes = { message: "success", data: books };

    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    let jsonRes = { message: "success" };
    const { id } = req.params;
    let deletedBook = await Book.findOneAndDelete({ _id: id });

    if (deletedBook) {
      jsonRes.message = "Book deleted successfully";
      res.status(200).json(jsonRes);
      const messageContent = JSON.stringify(deletedBook);
      await sendMessageToQueue("deletedBook", messageContent);
    } else {
      jsonRes.message = "Book not found";
      res.status(404).json(jsonRes);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const { id } = req.params;
    const newBookData = req.body;

    if (req.file) {
      // If a file was uploaded, add its path to the new book data
      newBookData.image = req.file.path;
    }

    const updatedBook = await Book.findOneAndUpdate({ _id: id }, newBookData, {
      new: true,
    });

    if (updatedBook) {
      jsonRes.data = updatedBook;
      res.status(200).json(jsonRes);
    } else {
      jsonRes.message = "Book not found";
      res.status(404).json(jsonRes);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
