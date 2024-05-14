import axios from "axios";
import Loan from "../models/Loan.js";
import { sendMessageToQueue } from "../utils/broker.js";

export const getLoans = async (req, res) => {
  try {
    let loans = await Loan.find();
    let jsonRes = { message: "success", data: loans };
    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getloanById = async (req, res) => {
  try {
    const { id } = req.params;
    let loans = await Loan.findOne({ _id: id });
    let jsonRes = { message: "success", data: loans };
    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getClientLoansById = async (req, res) => {
  try {
    const { id } = req.params;
    let loans = await Loan.find({ client: id, dateRetour: null });
    let jsonRes = { message: "success", data: loans };
    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addLoan = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };

    const loan = req.body;

    let { client, book } = loan;

    let clientRecord = await axios.get("http://127.0.0.1:3001/api/" + client);
    let dataClient = clientRecord.data;

    let bookRecord = await axios.get("http://127.0.0.1:3000/api/" + book);
    let dataBook = bookRecord.data;

    console.log(dataClient, dataBook);

    if (!dataClient.data || !dataBook.data) {
      jsonRes.message = "Client or book not found";
      res.status(404).json(jsonRes);
    }

    const newLoan = await Loan.create(loan);
    jsonRes.data = newLoan;
    const messageContent = JSON.stringify(newLoan);
    await sendMessageToQueue("loanTaken", messageContent);
    res.status(202).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const loan = req.body;

    let { client, book } = loan;
    const newLoan = await Loan.updateMany(
      { client: client, book: book },
      { dateRetour: Date.now() }
    );

    jsonRes.data = newLoan;
    res.status(200).json(jsonRes);
    const messageContent = JSON.stringify(newLoan);
    await sendMessageToQueue("loanReturned", messageContent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const returnBooks = async (req, res) => {
  try {
    const { client } = req.params;
    const newLoan = await Loan.updateMany(
      { client: client },
      { dateRetour: Date.now() }
    );
    res.status(200).json(newLoan);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
