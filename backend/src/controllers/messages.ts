import express, { RequestHandler, Response } from "express";
import User from "../Models/User";
import Message from "../Models/Message";

// Define the expected types for request bodies
interface PostMessageRequestBody {
    text: string;
    receiverId: number;
    senderId: number;
}

// Post a new message
//@ts-ignore
export const sendMessage: RequestHandler<
    {},
    {},
    PostMessageRequestBody
> = async (req, res): Promise<Response> => {
    const { text, receiverId, senderId } = req.body;

    // Ensure sender and receiver exist
    const sender = User.Storage.find("users", senderId);
    const receiver = User.Storage.find("users", receiverId);

    if (!sender || !receiver) {
        return res.status(400).json({ message: "Invalid sender or receiver" });
    }

    // Create a new message instance
    const message = new Message();
    message.text = text;
    message.receiverId = receiverId;
    message.senderId = senderId;
    message.createdAt = Date.now();

    const result = message.create(); // Store message in Storage

    if (!result) {
        return res.status(500).json({ message: "Message creation failed" });
    }

    return res
        .status(201)
        .json({ message: "Message sent successfully", messageId: message.id });
};

// Get all messages
//@ts-ignore
export const getAllMessages: RequestHandler = async (
    req,
    res
): Promise<Response> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify JWT token
    const decoded = User.verifyJwt(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const messages = Message.Storage.get("message");
    return res.status(200).json(messages);
};
