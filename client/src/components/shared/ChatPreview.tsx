import { FC } from 'react';

type Props = {
  className?: string;
};

export const ChatPreview: FC<Props> = ({ className }) => {
  return <div className={className}>ChatPreview</div>;
};
