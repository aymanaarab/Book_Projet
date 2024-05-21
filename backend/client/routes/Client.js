import express from "express";
import {
  deleteClient,
  getAllClientsEmails,
  getClientById,
  getClients,
  loginUser,
  logout_User,
  registerUser,
  updateClient,
} from "../controllers/Client.js";
import authMiddleware from "../middlewares/Client.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/", getClients);
route.get("/emails", getAllClientsEmails);
// route.post("/add-client", addClient);
route.get("/:id", getClientById);
route.put("/update-client/:id", authMiddleware, updateClient);
route.delete("/delete-client/:id", authMiddleware, deleteClient);
route.post("/logout_User",logout_User);

export default route;
