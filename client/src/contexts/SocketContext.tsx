import { SOCKET_URL } from '@/api/config';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

type EmitEventFunction = (event: string, ...args: any[]) => boolean;

interface SocketContextType {
  socket: Socket | null;
  // useEvents: (events: EventRecord) => void;
  emitEvent: EmitEventFunction;
}

type EventListener = (...args: any) => void;
type EventRecord = Record<string, EventListener>;

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const useEvents = (events: EventRecord, deps: any[] = []) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const eachEvent = (callback: (name: string, listener: EventListener) => void) => {
      for (const name in events) {
        callback(name, events[name]);
      }
    };

    eachEvent((name, listener) => socket.on(name, listener));

    return () => {
      eachEvent((name, listener) => socket.off(name, listener));
    };
  }, [socket, ...deps]);
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const emitEvent: EmitEventFunction = (event, ...args) => {
    if (!socket) {
      return false;
    }

    socket.emit(event, ...args);
    return true;
  };

  return <SocketContext.Provider value={{ socket, emitEvent }}>{children}</SocketContext.Provider>;
};
