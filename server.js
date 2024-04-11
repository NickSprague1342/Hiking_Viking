const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
// creates new sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
app.use(express.static(path.join(__dirname, 'public')));
// configures & links session object w/sequelize store and stores as express.js middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new SequelizeStore({
      db: sequelize
    })
  }))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});