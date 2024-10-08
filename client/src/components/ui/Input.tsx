import { cn } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  className?: string;
  value: string;
  handleChange: (v: string) => void;
  onKeyDown?: (e: any) => void;
  placeholder: string;
};

export const Input: FC<Props> = ({ className, handleChange, ...props }) => {
  return (
    <input
      className={cn(
        'border border-gray-400 focus:outline-1 rounded-md text-gray-400 px-3 py-2 focus:border-sky-500 outline-none focus:shadow-md hover:shadow-md transition-all',
        className,
      )}
      onChange={(e) => handleChange(e.target.value)}
      {...props}
    />
  );
};
