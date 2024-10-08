import { FC, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Status, User } from '@/types';
import { useReceiverStore } from '@/store/receiver';
import { useMessagesStore } from '@/store/messages';
import { useAuthStore } from '@/store/auth';
import { useEvents } from '@/contexts/SocketContext';

type Props = {
  user: User;
};

export const ChatPreview: FC<Props> = ({ user }) => {
  const { receiver, setReceiver } = useReceiverStore((state) => state);
  const auth = useAuthStore((state) => state);
  const { messages, getFilteredMessages } = useMessagesStore((state) => state);

  const [lastMessageText, setLastMessageText] = useState<string>('');

  const handleClick = () => {
    setReceiver(user);
  };

  useEvents(
    {
      messageSent: (message) => {
        if (user?.id === message.senderId || user?.id === message.receiverId) {
          setLastMessageText(message.text);
        }
      },
    },
    [receiver],
  );

  useEffect(() => {
    const _lastMessage =
      getFilteredMessages(auth.user?.id as number, user?.id as number).sort((a, b) => b.createdAt - a.createdAt)[0] ??
      '';

    setLastMessageText(_lastMessage.text?.length ? _lastMessage.text : (user?.lastMessage?.text ?? ''));
  }, [messages.length]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative rounded-md flex gap-3 hover:bg-gray-100 py-1 transition-colors cursor-pointer',
        receiver?.id === user.id ? 'bg-gray-200' : '',
      )}
    >
      <img className={cn('w-[70px] h-[70px] rounded-md')} src={user?.avatar} alt="avatar" />

      {user?.status === Status.ONLINE && (
        <div className="absolute block bg-lime-500 z-10 w-[15px] h-[15px] rounded-full bottom-[5px] left-[59px]" />
      )}

      <div className="flex flex-col">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-gray-500 max-w-[200px] text-ellipsis overflow-hidden text-nowrap">{lastMessageText}</p>
      </div>
    </div>
  );
};
