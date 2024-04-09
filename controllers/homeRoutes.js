//=====================================
// basic requires for express, sequalize, dotenv, and files.
//=====================================
const router = require('express').Router();
// const needAuth = require('utils/auth.js');

//===================================
// below is a try/catch with generic error message and 500 error for bad server
//===================================
router.get('/' , async (req, res) => {
    try {
        res.render('homepage', { loggedIn: req.session.loggedIn, title:'HIKING VIKING'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Oh No! A Generic Error Massage!`})
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login', { loggedIn: req.session.loggedIn, title: 'Login Page'});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

router.get('/reviews', async (req, res) => {
    try {
        res.render('reviews', { loggedIn: req.session.loggedIn, title: 'Reviews'});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

module.exports = router;
