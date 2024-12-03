import {
  Event,
  ISocketContext,
  SocketProviderProps,
  room,
  userPos,
  userType,
} from "@/types/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [newPlayer, setNewPlayer] = useState<userType[]>([]);

  const createRoom = useCallback(
    (data: room) => {
      if (socket) {
        socket.emit(Event.CREATEROOM, data);
      }
    },
    [socket],
  );

  const playerJoin = useCallback(
    (data: userType) => {
      if (socket) {
        socket.emit(Event.PLAYERJOIN, data);
      }
    },
    [socket],
  );

  const playerMove = useCallback(
    (data: userPos) => {
      if (socket) {
        if (socket) {
          socket.emit(Event.PLAYERMOVE, data);
        }
      }
    },
    [socket],
  );

  const playerJoinReply = useCallback(
    (data: userType[]) => {
      setNewPlayer((_prev) => {
        const combined = [..._prev, ...data];
        const uniquePlayers = [
          ...new Map(combined.map((player) => [player.name, player])).values(),
        ];
        return uniquePlayers;
      });
    },
    [socket],
  );

  const playerMoveReply = useCallback((data: userPos) => {}, [socket]);

  useEffect(() => {
    const _socket = io("http://localhost:8000");

    _socket.on(Event.PLAYERJOINREPLY, playerJoinReply);

    setSocket((prev) => _socket);

    return () => {
      _socket.off(Event.PLAYERJOINREPLY, playerJoinReply);

      _socket.disconnect();

      setSocket(undefined);
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{ createRoom, playerJoin, playerMove, newPlayer }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
