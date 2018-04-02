function preparePromise(method, body, url, callbackSuccess, callbackError){

  let promise = require('request-promise');

  let props =
  {
    method:method,
    uri: url,
    body: body,
    json : true
  };

  let p = promise(props).then(callbackSuccess);
  if(callbackError)
    p.catch(callbackError);

  return p;
}

module.exports = {
  preparePromise: preparePromise,
};
