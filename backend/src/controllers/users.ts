import { RequestHandler } from "express";
import User from "../Models/User";

interface UserParams {
    id: string; // ID will be passed as a string in the URL
}

// Get all users
//@ts-ignore
export const getAllUsers: RequestHandler = (req, res): Promise<> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify JWT token
    const decoded = User.verifyJwt(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const users = User.Storage.get("users");
    res.status(200).json(users);
};

// Get a specific user by ID
export const getUserById: RequestHandler<UserParams> = (
    req,
    res
    //@ts-ignore
): Promise<> => {
    const { id } = req.params; // Get the 'id' parameter from the URL

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify JWT token
    const decoded = User.verifyJwt(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const user = User.Storage.find("users", Number(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
};
