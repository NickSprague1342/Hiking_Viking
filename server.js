// const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// const mysql = require('mysql2');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Templating engine
// Use helper functions w/in handlebars templates to perform specific tasks
// const hbs = exphbs.create({ helpers });
app.engine('handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static(('public')));

// Connection Pool
// const pool = mysql.createPool({
//     connectionLimit: 100,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PW,
//     database: process.env.DB_NAME
// });

// Connect to DB
// pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log('Connected as ID' + connection.threadId);
// });

// app.use(routes);

// Router
app.get('', (req, res) => {
    res.render('homepage')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));