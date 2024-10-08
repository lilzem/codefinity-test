export type User = {
  id: number;
  name: string;
  avatar: string;
  status: Status;
  description?: string;
  lastMessage?: Message;
};

export enum Status {
  OFFLINE = 0,
  ONLINE = 1,
}

export type Message = {
  id: number;
  text: string;
  receiverId: number;
  senderId: number;
  createdAt: number;
};
