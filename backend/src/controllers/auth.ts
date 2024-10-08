import { RequestHandler } from "express";
import User from "../Models/User";
import { getRandomName } from "../utils/string";
import { getRandomAvatar } from "../utils/files";

interface SignupRequestBody {
    username: string;
    password: string;
}

interface LoginRequestBody {
    username: string;
    password: string;
}

//@ts-ignore
export const getMe: RequestHandler<{}, {}, SignupRequestBody> = async (
    req,
    res
) => {
    const authHeader = req.headers["authorization"] as string;
    const token = authHeader && authHeader.split(" ")[1];
    let user = User.findByToken(token);

    if (!token || !user || user.isBot) {
        user = new User();
        user.name = getRandomName();
        user.avatar = getRandomAvatar();

        const result = user.create();

        if (!result) {
            return res
                .status(500)
                .json({ message: "User registration failed" });
        }
    }

    return res.status(201).json({
        message: "User created successfully",
        user,
        token: token ?? user.generateAccessJwt(),
    });
};
