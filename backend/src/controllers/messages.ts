import { Request, Response } from "express";
import User from "../Models/User";
import Message from "../Models/Message";
import { AuthenticatedRequest } from "../middleware/auth";
import { handleMessage } from "../bots";
import { sendMessageToUser } from "../services/messages";

export const sendMessage = (req: AuthenticatedRequest, res: Response) => {
    const { text, receiverId } = req.body;
    const receiver = User.find(receiverId);
    if (!receiver) {
        return res.status(400).json({ message: "Invalid sender or receiver" });
    }

    const message = sendMessageToUser(
        text,
        req.user?.id as number,
        receiver.id
    );

    if (!message) {
        return res.status(500).json({ message: "Message creation failed" });
    }

    handleMessage(message);

    return res.status(201).json(message);
};

export const getMessages = (req: AuthenticatedRequest, res: Response) => {
    const _id = req.user?.id;
    const id = +req.params.id;

    const messages = Message.all()?.filter(
        ({ senderId, receiverId }) =>
            (senderId === id || receiverId === id) &&
            (senderId === _id || receiverId === _id)
    );

    return res.status(200).json(messages);
};

export const getAllMessages = (req: AuthenticatedRequest, res: Response) => {
    const messages = Message.all();

    return res.status(200).json(messages);
};
