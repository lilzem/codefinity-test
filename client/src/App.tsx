import { useEffect, useState } from 'react';

import axios from '@/api/axios';
import { AllChats, Chat, Container, Header } from '@/components/shared';
import { useSocket } from './contexts/SocketContext';
import { useAuthStore } from './store/auth';
import { useMessagesStore } from './store/messages';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { login } = useAuthStore((state) => state);
  const { socket, emitEvent } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const fetchLogin = async () => {
      const res = await axios.get('api/auth/me');
      const { token, user } = res.data;

      login(token, user);

      return token;
    };

    fetchLogin()
      .then((token: string) => {
        emitEvent('auth', token);
      })
      .finally(() => setIsLoading(false));
  }, [socket]);

  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <Header />

      <main className="min-h-[calc(100vh-76px)] p-5 bg-gray-600 flex justify-center items-center">
        <Container className="w-[100%] p-15 bg-white flex flex-row rounded-md">
          <Chat className="flex-1" />
          <AllChats />
        </Container>
      </main>
    </>
  );
}

export default App;
