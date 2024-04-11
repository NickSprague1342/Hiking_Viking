const session = require("connect-session-sequelize");
// controllers/api/reviewRoutes.js
const express = require('express');
const router = express.Router();

router.get("/submit-review", (req, res) => {
    if (req.session.username) {
        const username = req.session.username;

        const db = connectDB();
        const mysql = "SELECT * FROM reviews WHERE username = ?";
        db.all(mysql, [username], (err, reviews) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Error");
            } else {
                res.render("submit-review", { username, reviews });
            }
        });
        db.close();
    } else {
        res.redirect("/login");
    }
});

router.post("/post_review", (req, res) => {
    if (req.session.username) {
        const username = req.session.username;
        const { review_text, rating } = req.body;

        if (!review_text || !rating) {
            res.status(400).send("Oh No! Your review is empty!");
            return;
        }

        const db = connectDB();
        const sql =
            "INSERT INTO reviews (username, review_text, rating) VALUES (?, ?, ?)";
        db.run(sql, [username, review_text, rating], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Error");
            } else {
                res.redirect("/user_page");
            }
        });
        db.close();
    } else {
        res.redirect("/login");
    }
});

module.exports = router;