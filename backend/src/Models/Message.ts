import { Model } from "./Model";

export default class Message extends Model {
    text!: string;
    receiverId!: number;
    senderId!: number;
    createdAt!: number;

    getStorageKey(): string {
        return "message";
    }
}
