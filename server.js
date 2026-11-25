
const express = require("express");
const db = require("./database/db");
const loginRoutes = require("./routes/login");
const uploadRoutes = require("./routes/upload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", loginRoutes);
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to CampusConnect Student Portal!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
