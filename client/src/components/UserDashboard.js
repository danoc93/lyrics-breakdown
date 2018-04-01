import React from 'react';
import {Jumbotron, Grid, Row, Col, ListGroup, Alert,
  ListGroupItem} from 'react-bootstrap';

import UserService from '../controllers/UserService.js';
import UserDescriptor from './UserDescriptor';
import UserRanking from './UserRanking';
import EditSongPopover from './EditSongPopover';
import MusicService from '../controllers/MusicService.js';

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

    this.prepareBindings();
    this.musicService = new MusicService();

  }

  prepareBindings() {
    this.dataLoaded = this.dataLoaded.bind(this);
    this.dataAdded = this.dataAdded.bind(this);
    this.generateList = this.generateList.bind(this);
  }

  componentDidMount() {

    this.setState({isUserLoggedIn : UserService.isUserLoggedIn() });
    this.setState({currUserName : UserService.getCurrentUserName() });
    this.setState({currUserId : UserService.getCurrentUserId() });

    this.musicService.getUserTracks(
      UserService.getCurrentUserName(),
      this.dataLoaded);

  }

  /* Happens after rendering. */
  dataLoaded(response) {

    this.setState({ favouriteSongs : [], songsAvailable : false });

    let data = response.body;
    if (data) data = data.data;
    if(objUtils.isEmpty(data)) return;

    this.setState({ favouriteSongs : data, songsAvailable : true });

  }

  dataAdded(response) {
    window.location = '/dashboard';
    this.forceUpdate();
  }

  generateList(item, index) {
    
    return (
      <ListGroupItem key={index}
      header={
        <div className="songHeader">
          <span className="songDescription">
          <span role="img" aria-label="notes">🎵</span>
          {item.song_name}</span>
          <EditSongPopover
            name={item.song_name}
            callbackSuccess={this.dataAdded}
            creator_id={this.state.currUserName}
            artist={item.artist_name}
            songId={item._id} />
        </div>
      }
      bsStyle="success">
      <small>{item.artist_name}</small>
      </ListGroupItem>

    );

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
          Favourite Songs<span> </span>
          <span role="img" aria-label="notes">🎶</span>
          <EditSongPopover
            modeCreate={true}
            bsStyle="warning"
            callbackSuccess={this.dataAdded}
            creator_id={this.state.currUserName}/>
          </h3>

          <ListGroup>
          {
            this.state.favouriteSongs.map(this.generateList)
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
