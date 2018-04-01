import React from 'react';
import { Jumbotron, Grid, Row, Col, Panel } from 'react-bootstrap';

import LeaderboardService from '../controllers/LeaderboardService.js';

/**
Component: Leaderboards
Shows global leaderboards and user relevant scores.
Pending:
- When back-end is implemented, this should load user game history.
*/


class Leaderboards extends React.Component {
  constructor(props){
    super(props);  
    this.state = {
      'globalLeaderboard': null,
      'countryLeaderboard': null,
      'globalLeaderboardSize': 5,
      'countryLeaderboardSize': 3
    }
    LeaderboardService.buildGlobalLeaderBoard(this.state.globalLeaderboardSize).then((globalLeaderboard)=>{
      this.setState({'globalLeaderboard' : globalLeaderboard});
    }).catch((err)=>{
      console.log(err);
    });

    LeaderboardService.buildCountryLeaderBoard(this.state.countryLeaderboardSize, '38').then((countryLeaderboard)=>{
      this.setState({'countryLeaderboard' : countryLeaderboard});
    }).catch((err)=>{
      console.log(err);
    });


  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <h2>
            <span role="img" aria-label="cup">🏆</span>&nbsp; Leaderboards
            </h2>
          </Grid>
        </Jumbotron>

        <Grid>
        <Row>
          <Col sm={6}>
            <Panel>
              <Panel.Heading>
                <span role="img" aria-label="world">🌎</span>
                Global Leaderboard
              </Panel.Heading>
              {this.state.globalLeaderboard}
            </Panel>
          </Col>

          <Col sm={6}>
            <Panel>
              <Panel.Heading>
                <span role="img" aria-label="canada">🇨🇦</span>
                Canadian Leaderboard
              </Panel.Heading>
              {this.state.countryLeaderboard}
            </Panel>
          </Col>

        </Row>
        </Grid>
      </div>

    );
  }
}

export default Leaderboards;
