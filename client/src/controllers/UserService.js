import {Environment} from './Environment.js';
import decode from 'jwt-decode';

/**
Controller: UserService
Interface to request user data from the backend.
*/

const crypto = require("crypto-js");
const resource = 'user';

const BASE_REQ = `${Environment.BACKEND_ROOT}/${resource}`;
const LOGIN_RESOURCE = 'login';
const CREATE_RESOURCE = 'create';
const TOKEN_ID = 'id_token';
const USERNAME_KEY = 'username';
const COUNTRY_KEY = 'country_id';
const USERID_KEY = '_id';

let requestUtils = require('../utils/RequestUtils.js');
let objUtils = require('../utils/ObjectUtils.js');

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

  /* STATIC FUNCTIONS TO CONTROL LOGIN. */
  static storeUserToken(token){
    localStorage.setItem(TOKEN_ID, token);
  }

  static getUserToken(){
    return localStorage.getItem(TOKEN_ID);
  }

  static getDecodedUserData(){
    let data = localStorage.getItem(TOKEN_ID);
    if (objUtils.isEmpty(data)) return;
    return decode(data);
  }

  static isUserLoggedIn(token){
    return !objUtils.isEmpty(UserService.getDecodedUserData())
      && !UserService.isUserTokenExpired();
  }

  static getCurrentDataPoint(ref){
    let data = UserService.getDecodedUserData();
    if (objUtils.isEmpty(data)) return;
    return data[ref];
  }

  static getCurrentUserName(){
    return UserService.getCurrentDataPoint(USERNAME_KEY);
  }

  static getCurrentUserId(){
    return UserService.getCurrentDataPoint(USERID_KEY);
  }

  static getCurrentCountry(){
    return UserService.getCurrentDataPoint(COUNTRY_KEY);
  }

  static isUserTokenExpired() {
    let userToken = UserService.getDecodedUserData();
    if (userToken == null) return true;
    return userToken.exp < Date.now() / 1000;
  }

  static logOutUser(){
    localStorage.removeItem(TOKEN_ID);
  }

}

	export default UserService;
