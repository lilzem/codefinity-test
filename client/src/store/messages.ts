import { Message } from '@/types';
import { create } from 'zustand';

interface messagesStore {
  messages: Message[];

  setMessages: (messages: Message[]) => void;

  addMessage: (message: Message) => void;

  getFilteredMessages: (senderId: number, receiverId: number) => Message[];
}

export const useMessagesStore = create<messagesStore>()((set, get) => ({
  messages: [],

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => {
    const { messages, setMessages } = get();
    messages.push(message);
    setMessages(messages);
  },
  getFilteredMessages: (senderId, receiverId) => {
    const messages = get().messages;

    return messages.filter(
      (message) =>
        (message.senderId === senderId || message.receiverId === senderId) &&
        (message.senderId === receiverId || message.receiverId === receiverId),
    );
  },
}));
