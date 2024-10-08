import { BotBehavior } from "..";
import Message from "../../Models/Message";
import { Model } from "../../Models/Model";
import User from "../../Models/User";
import { sendMessageToUser } from "../../services/messages";
import { generateRandomTime } from "../../utils/timeUtils";

const b: BotBehavior = {
    botName(): string {
        return "Spam bot";
    },

    botDescription(): string {
        return "A bot that sends you spam messages with random interval";
    },

    async onInit(bot: User) {
        const sendSpamMessage = () => {
            User.all()?.forEach((user) => {
                if (user.isBot) {
                    return;
                }

                sendMessageToUser(
                    `Spam message from ${bot.name}`,
                    bot.id,
                    user.id
                );
            });
        };

        while (true) {
            await new Promise((resolve) =>
                setTimeout(resolve, generateRandomTime())
            );

            sendSpamMessage();
        }
    },

    onMessage(message: Message, bot: User) {},
};

export default b;
