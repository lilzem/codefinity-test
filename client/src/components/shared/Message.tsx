import { FC } from 'react';
import { Title } from './Title';
import { cn, formatTime } from '@/lib/utils';
import { User } from '@/types';
import { useAuthStore } from '@/store/auth';

export enum MessageType {
  SENT = 'sent',
  RECEIVED = 'received',
}

type Props = {
  type: MessageType.SENT | MessageType.RECEIVED;
  text: string;
  receiver: User;
  createdAt: number;
};

export const Message: FC<Props> = ({ type, text, receiver, createdAt }) => {
  const { user } = useAuthStore((state) => state);

  return (
    <div
      className={cn(
        'relative shadow-lg flex flex-col w-[100%] max-w-[700px] z-0',
        type === MessageType.RECEIVED ? 'self-start' : 'self-end',
      )}
    >
      <div
        className={cn(
          'rounded-t-lg px-4 py-2 flex justify-between items-center',
          type === MessageType.RECEIVED ? 'bg-gray-400' : 'bg-orange-300 bg-opacity-70',
        )}
      >
        <Title text={type === MessageType.RECEIVED ? receiver?.name : (user?.name as string)} size="xs" />
        <p className="text-gray-500">{formatTime(createdAt)}</p>
      </div>
      <div className="bg-white rounded-b-lg px-4 pt-2 pb-4 flex justify-between items-center">
        <p className="font-semibold">{text}</p>
      </div>
    </div>
  );
};
