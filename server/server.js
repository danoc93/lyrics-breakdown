const DatabaseService = require('./services/DatabaseService');

var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// Server Configuration.
const port = process.env.PORT || 5000;

// Global variables.
global.APP = {};

// Body parser to operate on requests easily.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session trackers.
var jwt = require('jsonwebtoken');
var environment = require('./services/Environment.js');
global.APP.sessionSecret = environment.SESSION_SECRET;

// CORS support.
var cors = require('cors');
app.use(cors({origin: '*'}));

// Database service.
global.APP.dbService = new DatabaseService();
global.APP.dbService.connectToDatabase();


/** SUPPORTED ROUTES **/

// Acceptable routes.
app.use('/user', require('./routes/UserRouter'));
app.use('/game', require('./routes/GameRouter'));
app.use('/leaderboards', require('./routes/LeaderboardsRouter'));
app.use('/score', require('./routes/ScoreRouter'));

/* Augmented API. */
app.use('/artist', require('./routes/ArtistRouter'));

// Unavailable route.
app.use('*', function(req, res){
  res.status(404).send('Service Not Found.');
});

/** LISTEN **/
app.listen(port, () => console.log(`Listening on port ${port}`));
