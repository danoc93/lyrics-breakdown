function preparePromise(method, body, url, callbackSuccess, callbackError){

  let promise = require('request-promise');
  promise(
    {
      method:'POST',
      uri: url,
      body: body,
      json : true
    }).then(callbackSuccess).catch(callbackError);

  return promise;
}

module.exports = {
  preparePromise: preparePromise,
};
