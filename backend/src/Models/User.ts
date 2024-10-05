import jwt from "jsonwebtoken";
import { Model } from "./Model";
import { JWT_SECRET } from "../config";

export default class User extends Model {
    name!: string;
    avatar!: string;
    socketId!: string;
    password!: string;
    createdAt!: number;

    getStorageKey(): string {
        return "users";
    }

    generateAccessJwt() {
        const payload = {
            id: this.id,
            username: this.username,
        };

        // You can customize the expiry time and algorithm
        const token = jwt.sign(payload, JWT_SECRET as string, {
            expiresIn: "10h",
        });

        return token;
    }

    static verifyJwt(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET as string); // Match the secret key
            return decoded;
        } catch (err) {
            return null; // Invalid token
        }
    }
}
