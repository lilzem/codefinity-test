import { RequestHandler, Response } from "express";
import User from "../Models/User";
import { AuthenticatedRequest } from "../middleware/auth";
import Message from "../Models/Message";

export const getAllUsers = (req: AuthenticatedRequest, res: Response) => {
    const users = User.all()?.filter((user) => user.id !== req.user?.id) ?? [];

    const usersWithLastMessage = users.map((user) => {
        const messages =
            Message.all()?.filter(
                (message) =>
                    message.senderId === user.id ||
                    message.receiverId === user.id
            ) ?? [];

        const lastMessage = messages.sort(
            (a, b) => b.createdAt - a.createdAt
        )[0];

        return {
            ...user,
            lastMessage: lastMessage ?? null,
        };
    });

    return res.status(200).json(usersWithLastMessage);
};

export const getUserById = (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const user = User.find(Number(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
};
