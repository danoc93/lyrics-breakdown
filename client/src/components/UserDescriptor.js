import React from 'react';
import { Panel } from 'react-bootstrap';

import ScoreService from '../controllers/ScoreService.js';
import UserService from '../controllers/UserService.js';
import {Constants} from '../utils/Constants.js';

/**
Component: UserDescriptor
Describes the current statistics for a user.
*/

let objUtils = require('../utils/ObjectUtils.js');

class UserDescriptor extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/
    /* Default values come from the Constants Service. */

    this.state = {
      isCurrentUser : this.props.isCurrentUser,
      country : '',
      countryName : '',
      highScore: 0,
      cumulativeScore : 0
    };

    this.scoreService = new ScoreService();

    this.prepareBindings();

  }

  prepareBindings(){
    this.processScores = this.processScores.bind(this);
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

    this.requestScores();
  }

  requestScores(){
    this.scoreService.getUserScores(
      UserService.getCurrentUserName(), this.processScores);
  }

  processScores(response){
    let data = response.data;
    if(!data) return;

    this.setState({
      highScore: data[0].maxscore,
      cumulativeScore: data[0].totalscore
    });
    
  }

  render (){
    return (
      <Panel>
        <Panel.Heading>
          <span role="img" aria-label="stats">📊</span>
          {(this.state.isCurrentUser ? 'Your' : '')} Statistics
        </Panel.Heading>
        <Panel.Body>
        <span><b>Country: </b>{this.state.country} ({this.state.countryName})</span>

        <br/>
        <span><b>Top Score: </b>{this.state.highScore}</span>

        <br/>
        <span><b>Cumulative Score: </b>{this.state.cumulativeScore}</span>
        </Panel.Body>
      </Panel>
    );
  }
}

export default UserDescriptor;
