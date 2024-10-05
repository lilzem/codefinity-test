import express from "express";

import { getAllUsers, getUserById } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById); // Route to get user by ID

export default router;
