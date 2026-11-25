
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// INSECURE LOGIN: Demonstration only
router.post("/insecure-login", (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM students
                   WHERE username = '${username}'
                   AND password = '${password}'`;

    db.get(query, (err, user) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        if (user) {
            res.send("Insecure login: Login successful!");
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
});

// SECURE LOGIN: Using Parameterized Query
router.post("/secure-login", (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM students
                   WHERE username = ?
                   AND password = ?`;

    db.get(query, [username, password], (err, user) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        if (user) {
            res.send("Secure login: Login successful!");
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
});

module.exports = router;
