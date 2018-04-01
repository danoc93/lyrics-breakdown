import React from 'react';
import {Popover, ButtonToolbar, ButtonGroup, Button,
  FormGroup, FormControl, Overlay} from 'react-bootstrap';

import MusicService from '../controllers/MusicService.js';

let objUtils = require('../utils/ObjectUtils.js');

/**
Controller: EditSongPopover.
Allows the user to change or add a song depending on the mode.
*/

class EditSongPopover extends React.Component {

  constructor(props, context) {
    super(props, context);


    let modeCreate = this.props.modeCreate === true;
    let style = modeCreate ? "success" : "primary";
    let icon = modeCreate ? "glyphicon glyphicon-plus-sign" :
      "glyphicon glyphicon-pencil";
    let title = modeCreate ? "Add Song" : "Edit Song";
    let name = modeCreate ? "" : this.props.name;
    let artist = modeCreate ? "" : this.props.artist;

    this.state = {
      modeCreate: modeCreate,
      name: name,
      icon: icon,
      style: style,
      title: title,
      artist: artist,
      songId: this.props.songId,
      creator_id: this.props.creator_id,
      show: false
    };

    this.parentCallBackSuccess = this.props.callbackSuccess;
    this.musicService = new MusicService();

    this.prepareBindings();

  }

  prepareBindings(){
    this.deleteClicked = this.deleteClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.handeShowClick = this.handeShowClick.bind(this);
    this.songNameChanged = this.songNameChanged.bind(this);
    this.songArtistChanged = this.songArtistChanged.bind(this);
    this.requestProcessed = this.requestProcessed.bind(this);
  }

  handeShowClick(e){
    this.setState({ target: e.target, show: !this.state.show });
  }

  componentWillReceiveProps(nextProps){

    this.parentCallBackSuccess = nextProps.callbackSuccess;
    let modeCreate = nextProps.modeCreate === true;
    let name = modeCreate ? "" : nextProps.name;
    let artist = modeCreate ? "" : nextProps.artist;

    this.setState({
      name: name,
      artist: artist,
      songId: nextProps.songId,
      creator_id: nextProps.creator_id,
    });

  }

  requestClicked(func){

    let payload = {
      song_name: this.state.name,
      artist_name: this.state.artist,
      song_id: this.state.songId
    };

    func(payload, this.state.creator_id, this.requestProcessed);

  }

  deleteClicked(){
    this.requestClicked(this.musicService.deleteUserTrack);
  }

  saveClicked(){
    let funcToCall = this.state.modeCreate ?
      this.musicService.addUserTrack : this.musicService.editUserTrack;
    this.requestClicked(funcToCall);
  }

  requestProcessed(response){

    this.setState({
      show : false,
      name : '',
      artist: ''
    });

    this.parentCallBackSuccess(response);
  }

  songNameChanged(event){
    this.setState({
      name: event.target.value
    });
  }

  songArtistChanged(event){
    this.setState({
      artist: event.target.value
    });
  }

  render(){

    return (

      <ButtonToolbar>
        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={this}>

          <Popover title={this.state.title}
            id="EditSongPopover">
            <div>
              <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.songNameChanged}
                  placeholder="Song Title"/>
                  <br/>
                <FormControl
                  type="text"
                  value={this.state.artist}
                  onChange={this.songArtistChanged}
                  placeholder="Artist"/>
              </FormGroup>

              <div className="pull-right">
                <ButtonToolbar className="text-right">
                  <ButtonGroup bsSize="small">
                    <Button bsStyle="success"
                    disabled={ objUtils.isEmpty(this.state.name) ||
                      objUtils.isEmpty(this.state.artist) }
                    onClick={this.saveClicked}>Save</Button>
                    <Button className={objUtils.hideIf(this.state.modeCreate)}
                      bsStyle="danger" onClick={this.deleteClicked}>Remove</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                <br/>
              </div>
            </div>
          </Popover>
        </Overlay>
        <Button className="pull-right" bsSize="xsmall"
          bsStyle={this.state.style}
          onClick={this.handeShowClick}>
            <span className={this.state.icon}/>
        </Button>
      </ButtonToolbar>

    );
  }
}

export default EditSongPopover;
