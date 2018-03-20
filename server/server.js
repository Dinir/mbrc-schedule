const express = require('express');
const hbs = require('hbs');

const path = require('path');

require('./config/config');
const mongoose = require('./db/mongoose');
const {Match} = require('./db/models/match');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.use(
  express.static(path.join(__dirname, '../public'))
);
hbs.registerPartials(path.join(__dirname, '../views/partials'));

/*app.get('/', (req, res) => {
  res.render('index.hbs', {});
});*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'bracket.html'));
});

app.get('/ahead', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'bracketAhead.html'));
});

app.listen(process.env.PORT, () => {
  console.log(
    `${new Date().toString()}: Server is up on port ${process.env.PORT}.`
  );
});

module.exports = {app};
