import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prénom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
