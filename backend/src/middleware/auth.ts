import { NextFunction, RequestHandler, Response, Request } from "express";
import User from "../Models/User";

export interface AuthenticatedRequest extends Request {
    user?: User;
}

const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"] as string;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Authentication failed. Token missing.",
        });
    }

    const user = User.findByToken(token);

    if (!user) {
        return res.status(403).json({
            status: false,
            message: "Authentication failed. User not found.",
        });
    }

    (req as AuthenticatedRequest).user = user;

    next();
};

export default authenticateToken;
