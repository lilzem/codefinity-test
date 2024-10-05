import express from "express";

import Auth from "./auth";
import Users from "./users";
import Messages from "./messages";
import router from "./auth";

const app = express(); // Create an app object

app.use("/api/auth", Auth);
app.use("/api/users", Users);
app.use("/api", Messages);

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.get("/api/", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

export default app;
