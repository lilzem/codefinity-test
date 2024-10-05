import express, { Application } from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { createServer } from "http";
import cors from "cors";

import Storage from "./storage";
import User from "./Models/User";
import { Model } from "./Models/Model";
import { PORT } from "./config";
import App from "./routes/index";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(App);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const storage = new Storage(["users", "messages"]);
Model.init(storage);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const user = new User();
    user.name = "aboba";
    user.avatar = "not exist";
    user.createdAt = Date.now();
    user.socketId = socket.id;
    user.create();

    console.log(user);

    console.log(storage.get("users"));

    socket.emit("getUsers");

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is Fire at http://localhost:${PORT}`);
});
