import { cn } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  className?: string;
  title: string;
  onClick: (v?: any) => void;
  disabled?: boolean;
};

export const Button: FC<Props> = ({ className, title, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-14 py-2 bg-blue-500 disabled:bg-slate-400 text-white text-md rounded-lg hover:shadow-lg hover:bg-sky-500 transition-all',
        className,
      )}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
