import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../Models/User";

// Define types for request bodies and parameters
interface SignupRequestBody {
    username: string;
    password: string;
}

interface LoginRequestBody {
    username: string;
    password: string;
}

// Sign up a new user
export const signup: RequestHandler<{}, {}, SignupRequestBody> = async (
    req,
    res
    //@ts-ignore
): Promise<> => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = User.Storage.find("users", username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User();
    user.name = username;
    user.password = hashedPassword;

    const result = user.create();

    if (!result) {
        return res.status(500).json({ message: "User registration failed" });
    }

    res.status(201).json({
        message: "User created successfully",
        userId: user.id,
    });
};

// Login user
export const login: RequestHandler<{}, {}, LoginRequestBody> = async (
    req,
    res
    //@ts-ignore
): Promise<> => {
    const { username, password } = req.body;

    const user = User.Storage.find("users", username);

    if (!user) {
        return res
            .status(400)
            .json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = user.generateAccessJwt();
    res.status(200).json({ token });
};
