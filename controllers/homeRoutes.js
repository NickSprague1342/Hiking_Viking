//=====================================
// basic requires for express, sequalize, dotenv, and files.
//=====================================
const router = require('express').Router();
const mysql = require('mysql');
const sequelize = require('sequelize');
const { Reviews, User, Hikes } = require('./models');
require('dotenv').config();
const needAuth = require('utils/auth.js');

//===================================
// below is a try/catch with generic error message and 500 error for bad server
//===================================
router.get('/' , async (req, res) => {
    try {
        res.render('homepage.handlebars', { loggedIn: req.session.loggedIn});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Oh No! A Generic Error Message!`})
    }
});

router.get('/password', async (req, res) => {
    try {
        res.render('password', { loggedIn: req.session.loggedIn});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

router.post('./models/reviews.js', (req, res) => {
    if (req.session.username) {
        const username = req.session.username;
        const { postedReview } = req.body

        if (!postedReview) {
            res.status(400).send({message: 'Oh no! Your review is empty!'});
            return;
        }
    }

    const mysql = mysql_db();
    const dbReviewPost = 'INSERT INTO reviews (username, postedReview) VALUES (?, ?)';
    mysql.run(dbReviewPost, [username, postedReview], (error) => {
        if (error) {
            console.log(error);
            res.status(500).send('Oops! We are having problems on our end! Please try again later!')
        }
    })
})

router.get('./models/reviews.js', async (res, req) => {
    try {
        const response = await fetch('models/reviews.js')
    } catch (error) {
        console.log(error);
    }
});
const reviewData = await res.json();
