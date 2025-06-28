import express from "express";
import { checkAuth, createUser, login } from "../Controller/auth.controller.js";
import { authenticate } from "../Middleware/auth.middleware.js";

const route = express.Router();

route.post("/create-user", createUser);
route.post("/login", login);
route.get("/checkAuth", authenticate, checkAuth);

export default route;
