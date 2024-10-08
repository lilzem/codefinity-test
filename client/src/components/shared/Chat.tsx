import { FC, useEffect, useRef, useState } from 'react';

import avatarExampleImage from '@/assets/avatar.jpg';
import { Title } from './Title';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import { Message, MessageType } from './Message';
import { useEvents, useSocket } from '@/contexts/SocketContext';
import axios from '@/api/axios';
import { Message as MessageObjType, User } from '@/types';
import { useAuthStore } from '@/store/auth';
import { useReceiverStore } from '@/store/receiver';
import { useMessagesStore } from '@/store/messages';

type ChatProps = {
  className?: string;
};

type ChatBodyProps = {
  messageText: string;
  handleMessageTextChange: (v: string) => void;
  onMessageSent: (v?: any) => void;
  isTyping: boolean;
  isLoading: boolean;
};

type ChatHeaderProps = {
  receiver: User;
};

export const Chat: FC<ChatProps> = ({ className }) => {
  const [messageText, setMessageText] = useState<string>('');
  const { messages, setMessages, addMessage } = useMessagesStore((state) => state);
  const { receiver } = useReceiverStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const receiverId = receiver?.id;
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { emitEvent } = useSocket();

  const sendMessage = () => {
    axios
      .post('api/messages', { text: messageText, receiverId: receiver?.id })
      .then(({ data }) => {
        addMessage(data);
      })
      .then(() => {
        emitEvent('typing', receiverId, false);
      })
      .then(() => setMessageText(''));
  };

  useEvents(
    {
      messageSent: (message) => {
        if (!receiver) {
          return;
        }

        if (receiverId === message.senderId) {
          addMessage(message);
        }
      },
      typing: (id, status) => {
        if (receiverId !== id) {
          return;
        }

        setIsTyping(status);
      },
    },
    [receiver],
  );

  useEffect(() => {
    setMessageText('');

    if (!receiverId) {
      return;
    }

    setIsLoading(true);

    axios
      .get(`api/messages/${receiverId}`)
      .then((res) => setMessages(messages.concat(res.data)))
      .finally(() => setIsLoading(false));
  }, [receiverId]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!messageText.length) {
      return;
    }

    emitEvent('typing', receiverId, true);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      emitEvent('typing', receiverId, false);
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [messageText]);

  return (
    <div className={cn('flex flex-col', className)}>
      <ChatHeader receiver={receiver as User} />

      <ChatBody
        messageText={messageText}
        handleMessageTextChange={setMessageText}
        onMessageSent={sendMessage}
        isTyping={isTyping}
        isLoading={isLoading}
      />
    </div>
  );
};

const ChatHeader: FC<ChatHeaderProps> = ({ receiver }) => {
  return (
    <div className="bg-gray-400 flex rounded-ss-md">
      <img src={receiver?.avatar ?? avatarExampleImage} className="w-[200px] h-[200px] rounded-ss-md" alt="user" />

      <div className="py-3 px-5 flex flex-col gap-1 items-start">
        <Title text={receiver?.name ?? 'Nobody'} size="lg" className="font-semibold" />
        <Title
          text={receiver ? (receiver.description as string) : 'Choose a user to chat'}
          size="xs"
          className="text-gray-800"
        />
      </div>
    </div>
  );
};

const ChatBody: FC<ChatBodyProps> = ({ messageText, handleMessageTextChange, onMessageSent, isLoading, isTyping }) => {
  const { user } = useAuthStore((state) => state);
  const { receiver } = useReceiverStore((state) => state);
  const { getFilteredMessages } = useMessagesStore((state) => state);

  const filteredMessages = getFilteredMessages(user?.id as number, receiver?.id as number);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' && messageText.length) {
      onMessageSent();
    }
  };

  useEffect(() => {
    if (!chatContainerRef.current) {
      return;
    }

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [filteredMessages]);

  return (
    <div className="bg-gray-300 p-5 rounded-es-md">
      <div ref={chatContainerRef} className="h-[350px] overflow-auto flex flex-col gap-5 pr-5">
        {isLoading && 'Loading...'}
        {filteredMessages.map((message) => (
          <Message
            key={message.id}
            type={message.senderId === user?.id ? MessageType.SENT : MessageType.RECEIVED}
            receiver={receiver as User}
            {...message}
          />
        ))}
      </div>

      {isTyping && <p className="text-center my-1 text-sky-500">{`${receiver?.name} is typing...`}</p>}
      <div className={cn('flex gap-3 items-center', !isTyping ? 'mt-5' : '')}>
        <Input
          className="flex-1"
          value={messageText}
          handleChange={handleMessageTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Start chatting!"
        />
        <Button disabled={!messageText.length} title="Send Message" onClick={onMessageSent} />
      </div>
    </div>
  );
};
