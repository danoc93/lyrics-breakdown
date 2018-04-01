var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');
var reqUtils = require('../utils/RequestUtils.js');
let jwt = require('jsonwebtoken');

/* Handle all the POST requests routed at /user/login. */
router.post('/login', function(req, res, next) {

  let requestData = req.body;

  if ( objUtils.isEmpty(requestData) ){
    res.status(400).send('Invalid request data!');
    return;
  }

  let username = requestData.username;
  let password = requestData.password;

  if ( objUtils.isEmpty(username) || objUtils.isEmpty(password) ){
    res.status(400).send('Invalid request data!');
    return;
  }

  let loginRequest =
    global.APP.dbService.checkCredentialsUsername(username, password,

    (response) => {
      if (response.length > 0)
      {

        // Send a token!
        var target = response[0];
        const payload = {
          userId: target._id,
          username: target.username,
          country_id: target.country_id
        };

        var token = jwt.sign(payload, global.APP.sessionSecret, {
          expiresIn: '200h'
        });

        res.json({
          success: true,
          message: 'Succesful autentication.',
          token: token
        });

      }
      else {
        res.status(401).send('Invalid login credentials.');
      }

    },

    (error) => {
      console.log(error);
      res.status(500).send('Could not access database.');
    }

  );

});

function isRegistrationDataValid (requestData)
{

  if ( objUtils.isEmpty(requestData) ){
    return false;
  }

  let username = requestData.username;
  let password = requestData.password;
  let emailAddress = requestData.emailAddress;
  let countryId = requestData.countryId;

  if ( objUtils.isEmpty(username)
      || objUtils.isEmpty(countryId)
      || objUtils.isEmpty(password)
      ||  objUtils.isEmpty(emailAddress)){
    return false;
  }
  return true;
}

/* Handle all the POST requests routed at /user/create. */
router.post('/create', function(req, res, next) {
  let requestData = req.body;
  if (!isRegistrationDataValid(requestData)){
    res.status(400).send('Invalid request data!');
    return;
  }

  let db = global.APP.dbService;

  // Promise to check if a user already exists.
  db.doesUsernameExist(
    requestData.username,

    // Success function.
      (response) => {

        if (response.length > 0){
          res.status(403).send('Username not available!');
          return;
        }

        // Promise to add the user to the DB!
        let result = db.createUser(
          requestData.countryId, requestData.emailAddress,
          requestData.username, requestData.password,

          (response) => {
            if(response.insertedCount === 1)
              res.send('User created succesfully!');
            else
              res.status(500).send('Could not create user.');
          }

        );

        if(result == null){
          res.status(500).send('Could not access database.');
        }

      }

  );

});

module.exports = router;
