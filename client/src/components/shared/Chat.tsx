import { FC, useState } from 'react';

import userSVG from '@/assets/user.svg';
import { Title } from './Title';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';

type ChatProps = {
  className?: string;
};

type ChatBodyProps = {
  messageText: string;
  handleMessageTextChange: (v: string) => void;
  onMessageSent: (v?: any) => void;
};

export const Chat: FC<ChatProps> = ({ className }) => {
  const [messageText, setMessageText] = useState<string>('');

  const sendMessage = () => {};

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
    <div className="bg-gray-300 py-5 pl-5 rounded-es-md pr-10 rounded">
      <div className="flex gap-3 itemc-center">
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
