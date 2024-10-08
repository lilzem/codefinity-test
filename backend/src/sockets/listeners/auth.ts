import { getIO, IListener } from "..";
import User, { Status } from "../../Models/User";

const listener: IListener = {
    event: "auth",
    protected: false,
    handle: (socket, token: string) => {
        const user = User.findByToken(token);

        if (!user) {
            socket.emit("auth", {
                status: false,
                message: "Invalid credentials",
            });

            return;
        }

        user.update({
            socketId: socket.id,
            status: Status.ONLINE,
        });

        socket.emit("auth", {
            status: true,
        });

        getIO()?.emit("userChanged", user);
    },
};

export default listener;
