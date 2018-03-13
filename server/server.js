const express = require('express');
const hbs = require('hbs');

const path = require('path');

require('./config/config');
const mongoose = require('./db/mongoose');
const {Match} = require('./db/models/match');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
hbs.registerPartials(path.join(__dirname, '../views/partials'));

app.get('/', (req, res) => {
  res.render('index.hbs', {});
});

app.listen(process.env.PORT, () => {
  console.log(
    `${new Date().toString()}: Server is up on port ${process.env.PORT}.`
  );
});

module.exports = {app};
