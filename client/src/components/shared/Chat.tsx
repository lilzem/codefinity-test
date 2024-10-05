import { FC, useEffect, useState } from 'react';

import userSVG from '@/assets/user.svg';
import { Title } from './Title';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import { Message, MessageType } from './Message';
import { useSocket } from '@/contexts/SocketContext';

type ChatProps = {
  className?: string;
};

type ChatBodyProps = {
  messageText: string;
  handleMessageTextChange: (v: string) => void;
  onMessageSent: (v?: any) => void;
};

export const Chat: FC<ChatProps> = ({ className }) => {
  const socket = useSocket();

  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const [userId, setUserId] = useState<any>(null);

  const sendMessage = () => {};

  useEffect(() => {
    // Generate or get userId from session storage
    // let storedUserId = sessionStorage.getItem('userId');
    // if (!storedUserId) {
    //   storedUserId = Math.random().toString(36).substring(7);
    //   sessionStorage.setItem('userId', storedUserId);
    // }
    // setUserId(storedUserId);
    socket?.on('connect', () => {
      console.log('Connected');
    });

    socket?.on('receiveMessage', (message) => {
      console.log(message);
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket?.off('receiveMessage');
      socket?.off('connect');
    };
  }, [socket]);

  return (
    <div className={cn('flex flex-col', className)}>
      <ChatHeader />

      <ChatBody messageText={messageText} handleMessageTextChange={setMessageText} onMessageSent={sendMessage} />
    </div>
  );
};

const ChatHeader: FC = () => {
  return (
    <div className="bg-gray-400 flex rounded-ss-md">
      <img src={userSVG} className="w-[200px] h-[200px]" alt="user" />

      <div className="py-3 px-5 flex flex-col gap-1 items-start">
        <Title text="Reverse bot" size="lg" className="font-semibold" />
        <Title
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nemo hic doloribus asperiores nobis sit vitae, libero saepe quas cum cumque, tenetur dolores ipsa et delectus! Commodi consequatur inventore nobis."
          size="xs"
          className="text-gray-800"
        />
      </div>
    </div>
  );
};

const ChatBody: FC<ChatBodyProps> = ({ messageText, handleMessageTextChange, onMessageSent }) => {
  return (
    <div className="bg-gray-300 p-5 rounded-es-md">
      <div className="h-[400px] overflow-auto flex flex-col gap-5 pr-5">
        <Message type={MessageType.received} />
        <Message type={MessageType.sent} />
        <Message type={MessageType.received} />
        <Message type={MessageType.sent} />
        <Message type={MessageType.received} />
        <Message type={MessageType.sent} />
        <Message type={MessageType.received} />
        <Message type={MessageType.sent} />
      </div>

      <div className="flex gap-3 items-center mt-5">
        <Input
          className="flex-1"
          value={messageText}
          handleChange={handleMessageTextChange}
          placeholder="Start chatting!"
        />
        <Button title="Send Message" onClick={onMessageSent} />
      </div>
    </div>
  );
};
