import { BotBehavior } from "..";
import spamBot from "./spam";
import echoBot from "./echo";
import reverseBot from "./reverse";
import ignoreBot from "./ignore";

const behaviors: Record<string, BotBehavior> = {
    spamBot,
    echoBot,
    reverseBot,
    ignoreBot,
};

export default behaviors;
