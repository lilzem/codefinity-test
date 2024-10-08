//@ts-nocheck

import express from "express";
import {
    getAllMessages,
    getMessages,
    sendMessage,
} from "../controllers/messages";
import AuthMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/:id", AuthMiddleware, getMessages);
router.post("/", AuthMiddleware, sendMessage);
router.get("/", AuthMiddleware, getAllMessages);

export default router;
