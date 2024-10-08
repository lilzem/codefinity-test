import express, { Application } from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import cors from "cors";
import path from "path";

import Storage from "./storage";
import { Model } from "./Models/Model";
import App from "./routes/index";
import { PORT } from "./config/index";
import { initIO } from "./sockets/index";
import { initBots } from "./bots";

const app: Application = express();

const storage = new Storage(["users", "messages"]);
Model.init(storage);

// initializeBots();
initBots();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    "/public/avatars",
    express.static(path.join(process.cwd(), "public/avatars"))
);

app.use(App);

const server = createServer(app);

initIO(server);

server.listen(PORT, () => {
    console.log(`Server is Fire at http://localhost:${PORT}`);
});
