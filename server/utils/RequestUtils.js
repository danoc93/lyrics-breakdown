var objUtils = require('../utils/ObjectUtils.js');

function genericDatabaseCallback(response){
  res.send('Success!');
}

function genericDatabaseErrorHandler(error){
  console.log(error);
  res.status(500).send('Could not access database.');
}

module.exports = {
  genericDatabaseCallback: genericDatabaseCallback,
  genericDatabaseErrorHandler : genericDatabaseErrorHandler
};
