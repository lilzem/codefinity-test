import Message from "../Models/Message";
import User from "../Models/User";

export const sendMessageToUser = (
    text: string,
    senderId: number,
    receiverId: number
): Message | undefined => {
    const receiver = User.find(receiverId);
    const sender = User.find(senderId);

    if (!receiver || !sender) {
        return;
    }

    const message = new Message();
    message.text = text;
    message.receiverId = receiverId;
    message.senderId = senderId;
    message.createdAt = Date.now();
    message.create();

    receiver.emitEvent("messageSent", message);

    return message;
};
