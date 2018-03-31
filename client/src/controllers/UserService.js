import {Environment} from './Environment.js';

/**
Controller: MusicService
Interface to request game data from the backend.
*/

const crypto = require("crypto-js");
const resource = 'user';

const BASE_REQ = `${Environment.BACKEND_ROOT}/${resource}`;
const LOGIN_RESOURCE = 'login';
const CREATE_RESOURCE = 'create';

let requestUtils = require('../utils/RequestUtils.js');

class UserService{

  getSHA256Hash(password){
    return crypto.SHA256(password).toString(crypto.enc.Hex);
  }

	tryLogin(username, password, callbackSuccess, callbackError){

    let hashedPassword = this.getSHA256Hash(password);
		let url_req = `${BASE_REQ}/${LOGIN_RESOURCE}`;
    let body = {username:username, password:hashedPassword};
    requestUtils.preparePromise(
      'POST', body, url_req, callbackSuccess, callbackError);

	}

  tryCreate(username, password, emailAddress, countryId,
    callbackSuccess, callbackError){

    let hashedPassword = this.getSHA256Hash(password);
		let url_req = `${BASE_REQ}/${CREATE_RESOURCE}`;
    let body = {
      username:username,
      password:hashedPassword,
      emailAddress: emailAddress,
      countryId: countryId};
    requestUtils.preparePromise(
      'POST', body, url_req, callbackSuccess, callbackError);

	}

}

	export default UserService;
