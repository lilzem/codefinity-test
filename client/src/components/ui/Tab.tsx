import { cn } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  active: boolean;
  title: string;
  onClick: () => void;
};

export const Tab: FC<Props> = ({ active, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-center text-gray-600 flex-1 px-3 py-3 last:rounded-se-md',
        active ? 'bg-white' : 'bg-gray-100 border border-gray-200',
      )}
    >
      {title}
    </button>
  );
};
