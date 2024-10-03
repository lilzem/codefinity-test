import { FC } from 'react';

type Props = {
  className?: string;
};

export const AllChats: FC<Props> = ({ className }) => {
  return <div className={className}>AllChats</div>;
};
