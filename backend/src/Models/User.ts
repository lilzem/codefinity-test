import jwt from "jsonwebtoken";
import { Model } from "./Model";
import { JWT_SECRET } from "../config";
import { getRandomAvatar } from "../utils/files";
import { getSocket } from "../sockets/index";

export enum BotBehavior {
    Echo = "Echo",
    Reverse = "Reverse",
    Spam = "Spam",
    Ignore = "Ignore",
}

export enum Status {
    OFFLINE = 0,
    ONLINE = 1,
}

interface JWT_PAYLOAD {
    id: number;
}

export default class User extends Model {
    name!: string;
    avatar!: string;
    socketId!: string;
    createdAt!: number;
    status: Status = Status.OFFLINE;
    isBot: boolean = false;
    behavior?: string;
    description?: string;

    protected get storageKey(): string {
        return "users";
    }

    generateAccessJwt() {
        const payload: JWT_PAYLOAD = {
            id: this.id,
        };

        const token = jwt.sign(payload, JWT_SECRET as string, {
            expiresIn: "1h",
        });

        return token;
    }

    static findByToken(token: string): User | undefined {
        try {
            const { id } = jwt.verify(
                token,
                JWT_SECRET as string
            ) as JWT_PAYLOAD;

            return User.find(id);
        } catch (err) {
            return undefined;
        }
    }

    static createBot(
        name: string,
        behavior: string,
        description: string
    ): User {
        const bot = new User();
        bot.name = name;
        bot.isBot = true;
        bot.avatar = getRandomAvatar();
        bot.behavior = behavior;
        bot.description = description;
        bot.createdAt = Date.now();
        bot.status = Status.ONLINE;
        bot.create();
        return bot;
    }

    emitEvent(event: string, ...args: any[]): boolean {
        if (!this.socketId) {
            return false;
        }

        return getSocket(this.socketId)?.emit(event, ...args) ?? false;
    }
}
