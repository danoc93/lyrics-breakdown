var objUtils = require('../utils/ObjectUtils.js');

function genericDatabaseCallback(response){
  response.send('Succesful login.');
}

function genericDatabaseErrorHandler(error){
  console.log(error);
  res.status(500).send('Could not access database.');
}

module.exports = {
  genericDatabaseCallback: genericDatabaseCallback,
  genericDatabaseErrorHandler : genericDatabaseErrorHandler
};
