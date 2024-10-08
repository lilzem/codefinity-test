import { Model } from "./Model";
import User from "./User";

export default class Message extends Model {
    text!: string;
    receiverId!: number;
    senderId!: number;
    createdAt!: number;

    protected get storageKey(): string {
        return "messages";
    }

    receiver(): User | undefined {
        return User.find(this.receiverId);
    }

    sender(): User | undefined {
        return User.find(this.senderId);
    }
}
