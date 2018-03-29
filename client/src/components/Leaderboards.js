import React from 'react';
import { Jumbotron, Grid, Row, Col, Panel } from 'react-bootstrap';

import LeaderboardService from '../controllers/LeaderboardService.js';

/**
Component: Leaderboards
Shows global leaderboards and user relevant scores.
Pending:
- When back-end is implemented, this should load user game history.
*/

const Leaderboards = () => (
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
          {LeaderboardService.buildGlobalLeaderBoard()}
        </Panel>
      </Col>

      <Col sm={6}>
        <Panel>
          <Panel.Heading>
            <span role="img" aria-label="canada">🇨🇦</span>
            Canadian Leaderboard
          </Panel.Heading>
          {LeaderboardService.buildCountryLeaderBoard('Canada')}
        </Panel>
      </Col>

    </Row>
    </Grid>
  </div>
);

export default Leaderboards;
