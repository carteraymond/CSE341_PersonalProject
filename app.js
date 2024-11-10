const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const path = require('path');

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

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});