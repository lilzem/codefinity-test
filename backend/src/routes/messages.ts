import express from "express";
import { getAllMessages, sendMessage } from "../controllers/messages";

const router = express.Router();

router.get("/messages", getAllMessages);
router.post("/messages", sendMessage);

export default router;
