function isEmpty(value){
  return (value == null || value.length === 0);
}

function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showIf(cond){
  return cond ? '' : 'hidden';
}

function hideIf(cond){
  return cond ? 'hidden' : '';
}

function matchObject(property, val, data){
  if (isEmpty(data)) return;
  return data.filter(
    function (entry) { return entry[property] === val; }
  );
}

function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

module.exports = {
  isEmpty: isEmpty,
  isValidEmail : isValidEmail,
  encodeQueryData : encodeQueryData,
  showIf : showIf,
  hideIf : hideIf,
  matchObject : matchObject
};
