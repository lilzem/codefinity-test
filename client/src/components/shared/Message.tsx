import { FC } from 'react';
import { Title } from './Title';
import { cn } from '@/lib/utils';

export enum MessageType {
  sent = 'sent',
  received = 'received',
}

type Props = {
  type: MessageType.sent | MessageType.received;
};

export const Message: FC<Props> = ({ type }) => {
  return (
    <div
      className={cn(
        'relative shadow-lg flex flex-col w-[100%] max-w-[700px] z-0',
        type === MessageType.received ? 'self-start' : 'self-end',
      )}
    >
      <div
        className={cn(
          'rounded-t-lg px-4 py-2 flex justify-between items-center',
          type === MessageType.received ? 'bg-gray-400' : 'bg-orange-300 bg-opacity-70',
        )}
      >
        <Title text="Reverse bot" size="xs" />
        <p className="text-gray-500">4:20 PM</p>
      </div>
      <div className="bg-white rounded-b-lg px-4 pt-2 pb-4 flex justify-between items-center">
        <p className="font-semibold">Hello world!</p>
      </div>
    </div>
  );
};
