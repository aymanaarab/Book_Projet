import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateEmprunt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  dateRetour: {
    type: Date,
    required: false,
    default: null,
  },
});

let Loan = mongoose.model("Loan", loanSchema);

export default Loan;
