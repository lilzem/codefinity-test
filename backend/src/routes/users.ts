//@ts-nocheck

import express from "express";

import { getAllUsers, getUserById } from "../controllers/users";
import AuthMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/", AuthMiddleware, getAllUsers);
router.get("/:id", AuthMiddleware, getUserById);

export default router;
