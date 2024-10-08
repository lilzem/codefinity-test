import { BotBehavior } from "..";
import Message from "../../Models/Message";
import User, { Status } from "../../Models/User";
import { sendMessageToUser } from "../../services/messages";

const b: BotBehavior = {
    botName(): string {
        return "Echo bot";
    },

    botDescription(): string {
        return "A bot that replys you with your message";
    },

    async onInit(bot: User) {},

    onMessage(message: Message, bot: User) {
        setTimeout(() => {
            sendMessageToUser(message.text, bot.id, message.senderId);
        }, 1000);
    },
};

export default b;
