//=====================================
// basic requires for express, sequalize, dotenv, and files.
//=====================================
const router1 = require('express').Router();
const sequelize = require('sequelize');
const { Reviews, User, Hikes } = require('/Users/nicholassprague/bootcamp/PROJECTS/Project_2/models');
require('dotenv').config();
// const needAuth = require('utils/auth.js');

//===================================
// below is a try/catch with generic error message and 500 error for bad server
//===================================
router1.get('/' , async (req, res) => {
    try {
        res.render('homepage.handlebars', { loggedIn: req.session.loggedIn});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Oh No! A Generic Error Massage!`})
    }
});

router1.get('/password', async (req, res) => {
    try {
        res.render('password', { loggedIn: req.session.loggedIn});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

router1.get('models/reviews.js', async (res, req) => {
    try {
        const response = await fetch('models/reviews.js')
    }
});
const reviewData = await res.json();
