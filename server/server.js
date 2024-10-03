import express from "express";
const app = express();
const port = 3000;

// Serve static files
app.use("public");

app.get("/", (req, res) => {
    res.json({ fruits: ["apple, banana, strawberry"] });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
