import { FC } from 'react';
import { Container } from './Container';

export const Header: FC = () => {
  return (
    <div className="bg-white">
      <Container className="max-w-[1280px] pt-6 pb-4 text-3xl font-semibold">Chat bots 2.0</Container>
    </div>
  );
};
