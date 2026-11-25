
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/campusconnect.db", (err) => {
    if (err) {
        console.log("Database connection error:", err.message);
    } else {
        console.log("Connected to CampusConnect database!");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);
});

module.exports = db;
db.run(
    `INSERT OR IGNORE INTO students (username, password)
     VALUES (?, ?)`,
    ["student1", "student123"],
    (err) => {
        if (err) {
            console.log("Student creation error:", err.message);
        } else {
            console.log("Test student account ready!");
        }
    }
);