import express from "express";
import { login, signup } from "../controllers/auth";

const router = express.Router();

// Define routes using the handler functions
router.post("/signup", signup);
router.post("/login", login);

export default router;
