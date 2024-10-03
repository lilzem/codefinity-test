import { cn } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  className?: string;
  title: string;
  onClick: (v?: any) => void;
};

export const Button: FC<Props> = ({ className, title }) => {
  return (
    <button
      className={cn(
        'px-14 py-2 bg-blue-500 text-white text-md rounded-lg hover:shadow-lg hover:bg-sky-500 transition-all',
        className,
      )}
    >
      {title}
    </button>
  );
};
