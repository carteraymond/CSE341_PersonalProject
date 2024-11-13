const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const path = require('path');
// const passport = require('./helpers/passport');
// const session = require('express-session');
require('dotenv').config();
const axios = require('axios'); 

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(path.join(__dirname, 'views')));
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "x-requested-with, content-type, api_key");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  })
  .use('/', require('./routes'));

  
// METHOD 1, LOGIN PAGE, REQUESTS AFTER
  // OAuth routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

  app.get('/auth', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.Client_ID}`,
    );
  });

  app.get('/oauth-callback', ({ query: { code } }, res) => {
    const body = {
      client_id: process.env.Client_ID,
      client_secret: process.env.Client_Secret,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        // eslint-disable-next-line no-console
        console.log('My token:', token);
  
        res.redirect(`/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });

 // METHOD 2, SESSION REQUESTING AUTH FOR REQUESTS
  // app.get('/auth/github', passport.authenticate('github'));
  
  // app.get('/auth/github/callback', 
  //   passport.authenticate('github', { failureRedirect: '/' }),
  //   (req, res) => {
  //     res.redirect('/'); // Redirect after successful login
  //   });
  
  // app.get('/logout', (req, res) => {
  //   req.logout(() => res.redirect('/')); // Logout user
  // });

    // // Session setup
    // app.use(session({ secret: process.env.Session_Secret, resave: false, saveUninitialized: true }));
    // app.use(passport.initialize());
    // app.use(passport.session());
    

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});