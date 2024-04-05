//=====================================
// basic requires for express, sequalize, dotenv, and files.
//=====================================
const router1 = require('express').router();
const sequelize = require('sequelize');
const { Reviews, User, Hikes } = require('/Users/nicholassprague/bootcamp/PROJECTS/Project_2/models');
require('dotenv').config();
const needAuth = require('utils/auth.js');

//===================================
// for apikey
//===================================
const apiKey = process.env.apiKey;

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