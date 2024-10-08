import Message from "../Models/Message";
import User from "../Models/User";
import behaviors from "./handlers/index";

export interface BotBehavior {
    onInit(bot: User): void;
    onMessage(message: Message, bot: User): void;
    botName(): string;
    botDescription(): string;
}

function eachBehavior(callback: (behavior: BotBehavior, name: string) => void) {
    Object.keys(behaviors).forEach((name: string) =>
        callback(behaviors[name] as BotBehavior, name)
    );
}

export function initBots() {
    eachBehavior((b, n) => {
        const bot = User.createBot(b.botName(), n, b.botDescription());

        if (!bot) {
            return;
        }

        b.onInit(bot);
    });
}

export async function handleMessage(message: Message) {
    const { receiverId } = message;

    const user = User.find(receiverId);

    if (!user || !user.isBot || !user.behavior) {
        return;
    }

    behaviors[user.behavior]?.onMessage(message, user);
}
