import { FC } from 'react';

import avatarExampleImage from '@/assets/avatar.jpg';
import { cn } from '@/lib/utils';

export enum Status {
  online = 'online',
  offline = 'offline',
}

type Props = {
  status: Status.online | Status.offline;
};

export const ChatPreview: FC<Props> = ({ status }) => {
  return (
    <div className="relative rounded-l-md flex gap-3 hover:bg-gray-100 py-2 transition-colors cursor-pointer">
      <img
        className={cn(
          'w-[70px] h-[70px] rounded-md',
          // status === Status.online ? ' before:block' : 'before:hidden',
        )}
        src={avatarExampleImage}
        alt=""
      />

      {status === Status.online && (
        <div className="absolute block bg-lime-500 z-10 w-[15px] h-[15px] rounded-full bottom-[5px] left-[59px]" />
      )}

      <div className="flex flex-col">
        <p className="font-semibold">Reverse bot</p>
        <p className="text-gray-500 max-w-[200px] text-ellipsis overflow-hidden text-nowrap">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nemo hic doloribus asperiores nobis sit
        </p>
      </div>
    </div>
  );
};
