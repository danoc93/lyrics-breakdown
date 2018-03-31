import React from 'react';

import UserService from '../controllers/UserService.js';

class Logout extends React.Component {

  constructor(props){
    super(props);
    if(UserService.isUserLoggedIn()){
      UserService.logOutUser();
      window.location = '/';
    }
  }

  render(){
    return (null);
  }

}

export default Logout;
