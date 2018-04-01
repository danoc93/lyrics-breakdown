import React from 'react';
import {Jumbotron, Grid, Row, Col, ListGroup, Alert,
  ListGroupItem} from 'react-bootstrap';

import UserService from '../controllers/UserService.js';
import UserDescriptor from './UserDescriptor';
import UserRanking from './UserRanking';
import EditSongPopover from './EditSongPopover';

/**
Component: UserDashboard
Used for displaying user specific data.
*/

let objUtils = require('../utils/ObjectUtils.js');

class UserDashboard extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/
    /* Default values come from the Constants Service. */

    this.state = {
      currUserName : '',
      currUserId : '',
      isUserLoggedIn : false,
      favouriteSongs : [],
      songsAvailable : false
    };

  }

  componentDidMount() {

    this.setState({isUserLoggedIn : UserService.isUserLoggedIn() });
    this.setState({currUserName : UserService.getCurrentUserName() });
    this.setState({currUserId : UserService.getCurrentUserId() });

  }


  render(){

    return (
      <div>
          <Jumbotron>
              <Grid>
                <h2>
                User Profile
                </h2>
              </Grid>
              <br/>
              <Grid>
              <Row>
                <Col sm={6}>
                  <UserDescriptor isCurrentUser={true}/>
                </Col>

                <Col sm={6}>
                  <UserRanking username={this.state.currUserName}/>
                </Col>

              </Row>
              </Grid>

          </Jumbotron>

          <Grid>

          <h3>
          Favourite Songs <span> </span>
          <span role="img" aria-label="notes">🎶</span>
          <EditSongPopover modeCreate={true} bsStyle="warning"/>
          </h3>

          <ListGroup>
          {
            this.state.favouriteSongs.map(
              function(item, index){
                return (
                  <ListGroupItem header={item.name} bsStyle="warning">
                  {item.artist}
                  <EditSongPopover name={item.name}
                    artist={item.artist} songId={item.songId} />
                  </ListGroupItem>
                )

              })
          }
          </ListGroup>

          <Alert bsStyle="info"
            className={objUtils.hideIf(this.state.songsAvailable)}>
            You have no songs.
          </Alert>

          </Grid>
      </div>
    );
  }
}

export default UserDashboard;
