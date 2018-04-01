import React from 'react';
import { Panel } from 'react-bootstrap';

import UserService from '../controllers/UserService.js';
import {Constants} from '../utils/Constants.js';

/**
Component: UserRanking
Global component to show the statistics about a players ranking.
*/

let objUtils = require('../utils/ObjectUtils.js');

class UserRanking extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/

    this.state = {
      userId : this.props.username,
      rankingGlobal : 0,
      rankingLocal : 0
    };

  }

  componentDidMount() {

    if ( !UserService.isUserLoggedIn() ) return;
    let countryId = UserService.getCurrentCountry();
    let matches = objUtils.matchObject('id', countryId, Constants.countries);
    let flag = matches.length > 0 ? matches[0].flag : '🚩';
    let name = matches.length > 0 ? matches[0].name : '';
    let highScore = 0;
    let cumulativeScore = 0;

    this.setState(
      {
        country : flag,
        highScore: highScore,
        cumulativeScore : cumulativeScore,
        countryName : name
      });
  }

  retrievalSuccess(response){
    this.setState(
      {
        rankingGlobal : response.body.rankingGlobal,
        rankingLocal: response.body.rankingLocal
      });
  }

  render (){
    return (
      <Panel>
        <Panel.Heading>
          Rankings
        </Panel.Heading>
        <Panel.Body>


        <span>
        <span role="img" aria-label="global">🌎</span>
        <b> Global: </b>{this.state.rankingGlobal}
        </span>
        <br/>
        <span>
        <span role="img" aria-label="home">🏠</span>
        <b> Local: </b>{this.state.rankingLocal}
        </span>

        </Panel.Body>
      </Panel>
    );
  }
}

export default UserRanking;
