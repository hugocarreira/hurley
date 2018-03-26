require('dotenv').load();

const express = require('express');
const config = require('./config/config');
const mongoose = require('mongoose');
const db = require('./config/database');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./controllers/auth');
const cors = require('./config/cors');
const morgan = require('morgan');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
app.use(morgan('dev'));

app.use('/', auth);

app.get('/', (req, res) => {
    res.send("hurley is running...");
});

process.on('uncaughtException', function (err) {
  console.log(err);
})

app.listen(config.port, () => {
    console.log("Listening in  " + config.host + ":" + config.port);
});
