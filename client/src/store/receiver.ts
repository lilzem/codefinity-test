import { User } from '@/types';
import { create } from 'zustand';

interface receiverStore {
  receiver: User | null;

  setReceiver: (receiver: User) => void;
}

export const useReceiverStore = create<receiverStore>()((set) => ({
  receiver: null,
  setReceiver: (receiver) => set({ receiver }),
}));
