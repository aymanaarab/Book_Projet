import { sendMessageToQueue } from "../../book/utils/broker.js";
import Client from "../models/Client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { nom, prénom, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with hashed password
    const newUser = new Client({
      nom,
      prénom,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const messageContent = JSON.stringify(newUser);
    await sendMessageToQueue("addedClient", messageContent);
    res
      .status(201)
      .json({ message: "User registered successfully", id: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "3d" });
    const id = user._id;
    res.json({ token, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getClients = async (req, res) => {
  try {
    let clients = await Client.find();

    console.log(clients);
    let jsonRes = { message: "success", data: clients };

    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    let clients = await Client.findOne({ _id: id });

    let jsonRes = { message: "success", data: clients };
    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export const addClient = async (req, res) => {
//   try {
//     let jsonRes = { message: "success", data: null };
//     const client = req.body;
//     const newClient = await Client.create(client);

//     const messageContent = JSON.stringify(newClient);
//     await sendMessageToQueue("addedClient", messageContent);
//     // jsonRes.data = newClient;
//     res.status(202).json(jsonRes.message);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

export const updateClient = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const { id } = req.params;
    const client = req.body;
    const newClient = await Client.findOneAndUpdate({ _id: id }, client, {
      new: true,
    });
    jsonRes.data = newClient;
    res.status(200).json(jsonRes);
    const messageContent = JSON.stringify(newClient);
    await sendMessageToQueue("updatedClient", messageContent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const { id } = req.params;
    const newClient = await Client.findOneAndDelete({ _id: id });
    jsonRes.data = newClient;
    res.status(200).json(jsonRes);
    const messageContent = JSON.stringify(newClient);
    await sendMessageToQueue("deletedClient", messageContent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllClientsEmails = async (req, res) => {
  try {
    let jsonRes = { message: "success", data: null };
    const clients = await Client.find();
    const emails = clients.map((client) => client.email);
    jsonRes.data = emails;
    res.status(200).json(jsonRes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
