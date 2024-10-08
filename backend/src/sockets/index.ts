import { Server } from "http";
import { Server as ServerIO, Socket } from "socket.io";
import listeners from "./listeners/index";
import { forEach } from "../utils/object";
import User, { Status } from "../Models/User";

type SocketsMapCallback = (
    value: Socket,
    key: string,
    map: Map<string, Socket>
) => void;

export interface IListener {
    event: string;
    protected: boolean;
    handle: (socket: Socket, ...args: any[]) => void;
}

let io: ServerIO | null = null;

export function initIO(server: Server) {
    io = new ServerIO(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    registerListeners();
}

function registerListeners() {
    if (!io) {
        return;
    }

    io.on("connection", (socket) => {
        socket.onAny((event: string, ...args) => {
            forEach(listeners, (listener) => {
                if (listener.event !== event) {
                    return;
                }

                if (listener.protected) {
                    const user = User.firstWhere("socketId", "===", socket.id);

                    if (!user) {
                        return false;
                    }

                    args = [user, ...args];
                }

                listener.handle(socket, ...args);

                return false;
            });
        });

        socket.on("disconnect", () => {
            const user = User.firstWhere("socketId", "===", socket.id);

            if (!user) {
                return;
            }

            user.update({
                socketId: undefined,
                status: Status.OFFLINE,
            });

            getIO()?.emit("userChanged", user, user.status);
        });
    });
}

export function getSocket(key: string): Socket | undefined {
    return io?.sockets.sockets.get(key);
}

export function eachSocket(callback: SocketsMapCallback): void {
    io?.sockets.sockets.forEach(callback);
}

export function getIO(): ServerIO | null {
    return io;
}
