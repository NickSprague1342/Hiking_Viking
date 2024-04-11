//=====================================
// basic requires for express, sequalize, dotenv, and files.
//=====================================
const router = require('express').Router();
const Review = require('../models/reviews');

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

// Handle form submission to submit a new review
router.post('/submit-review', async (req, res) => {
    try {
        // Extract review data from request body
        const { title, content, user, rating } = req.body;

        // Create a new review document
        const review = new Review({ title, content, user, rating });

        // Save the review to the database
        await review.save();

        // Send a success response
        res.status(201).json({ message: 'Review submitted successfully!', review });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to submit review.' });
    }
});

module.exports = router;
