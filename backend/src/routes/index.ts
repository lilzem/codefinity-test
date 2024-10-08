import express from "express";

import Auth from "./auth";
import Users from "./users";
import Messages from "./messages";

const app = express();

app.use("/api/auth", Auth);
app.use("/api/users", Users);
app.use("/api/messages", Messages);

export default app;
