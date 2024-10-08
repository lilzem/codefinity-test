import { BotBehavior } from "..";
import Message from "../../Models/Message";
import User from "../../Models/User";

const b: BotBehavior = {
    botName(): string {
        return "Ignore bot";
    },

    botDescription(): string {
        return "A bot that ignores you and basically does nothing";
    },

    async onInit(bot: User) {},

    onMessage(message: Message, bot: User) {},
};

export default b;
