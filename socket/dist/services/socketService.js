"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const eventEnums_1 = require("../types/eventEnums");
class SocketService {
    constructor() {
        this.users = {};
        this.userRoom = [{ room: "", data: {} }];
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
    }
    initListeners() {
        const io = this.io;
        io.on(eventEnums_1.Event.CONNECT, (socket) => {
            const token = socket.handshake.query;
            console.log(token);
            socket.on(eventEnums_1.Event.CREATEROOM, (data) => {
                socket.join(data.name);
            });
            socket.on(eventEnums_1.Event.PLAYERJOIN, (data) => {
                console.log(data.name, " joined room ", data.room);
                this.userRoom.push({ room: data.room, data });
                const currentRoomUsers = this.userRoom.filter((e) => e.room === data.room);
                const usersInRoom = currentRoomUsers.map((e) => e.data);
                socket.join(data.room);
                io.emit(eventEnums_1.Event.PLAYERJOINREPLY, usersInRoom);
                // io.to(data.room).emit(Event.PLAYERJOINREPLY, data);
            });
            socket.on(eventEnums_1.Event.PLAYERMOVE, (data) => {
                const { x, y } = data;
                console.log(data.name, " player pos : ", x, y);
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
