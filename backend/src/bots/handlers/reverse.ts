import { BotBehavior } from "..";
import Message from "../../Models/Message";
import User from "../../Models/User";
import { sendMessageToUser } from "../../services/messages";

const b: BotBehavior = {
    botName(): string {
        return "Reverse bot";
    },

    botDescription(): string {
        return "A bot that replys you with reversed version of your message after 3 seconds delay";
    },

    async onInit(bot: User) {},

    onMessage(message: Message, bot: User) {
        const reversed = message.text.split("").reverse().join("");

        setTimeout(() => {
            sendMessageToUser(reversed, bot.id, message.senderId);
        }, 3000);
    },
};

export default b;
