export interface SocketUserMapping {
  [key: string]: string; // key is socket.id, value is the email
}

export interface userType {
  name: string;
  avatar: string;
  room: string;
}

export interface room {
  name: string;
}

export interface userPos{
    x:number,
    y:number,
    name:string
}