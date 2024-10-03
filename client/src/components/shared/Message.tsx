import { FC } from 'react';

type Props = {
  className?: string;
};

export const Message: FC<Props> = ({ className }) => {
  return <div className={className}>Message</div>;
};
