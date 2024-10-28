import { Server, Socket } from "socket.io";
import { SocketUserMapping, room, userPos, userType } from "../types/userType";
import { Event } from "../types/eventEnums";

export default class SocketService {
  private _io: Server;
  private users: SocketUserMapping = {};

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;

    io.on(Event.CONNECT, (socket) => {
      const token = socket.handshake.query;
      console.log(token);

      socket.on(Event.CREATEROOM, (data: room) => {
        socket.join(data.name);
      });

      socket.on(Event.PLAYERJOIN, (data: userType) => {
        console.log(data.name, " joined room ", data.room);

        socket.join(data.room);

        io.to(data.room).emit(Event.PLAYERJOINREPLY, data);
      });

      socket.on(Event.PLAYERMOVE, (data: userPos) => {
        const { x, y } = data;

        console.log(data.name, " player pos : ", x, y);
      });
    });
  }

  get io() {
    return this._io;
  }
}
