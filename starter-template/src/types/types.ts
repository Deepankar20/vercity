export const Event = {
  CONNECT: "connect",
  PLAYERJOIN: "playerJoin",
  PLAYERMOVE: "playerMove",
  PLAYERJOINREPLY: "playerJoinReply",
  PLAYERMOVEREPLY: "playerMoveReply",
  CREATEROOM: "createRoom",
};

export interface ISocketContext {
  playerJoin: (data: userType) => void;
  createRoom: (data: room) => void;
  playerMove: (data: userPos) => void;
  newPlayer: userType[];
}

export interface SocketProviderProps {
  children?: React.ReactNode;
}

export interface room {
  name: string;
}

export interface userType {
  name: string;
  avatar: string;
  room: string;
}

export interface userPos {
  x: number;
  y: number;
  name: string;
}
