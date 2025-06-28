import express from "express";
import {
  createNote,
  getNote,
  getNotes,
  editNote,
  deleteNote,
} from "../Controller/note.controller.js";
import { authenticate } from "../Middleware/auth.middleware.js";

const route = express.Router();

route.post("/", authenticate, createNote);
route.get("/:id", authenticate, getNote);
route.get("/", authenticate, getNotes);
route.put("/:id", authenticate, editNote);
route.delete("/:id", authenticate, deleteNote);

export default route;
