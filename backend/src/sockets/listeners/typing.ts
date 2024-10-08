import { IListener } from "..";
import User from "../../Models/User";

const listener: IListener = {
    event: "typing",
    protected: true,
    handle: (socket, user: User, id: number, status: boolean) => {
        const receiver = User.find(id);

        if (!receiver) {
            return;
        }

        receiver.emitEvent("typing", user.id, status);
    },
};

export default listener;
