import React from 'react';
import {Popover, ButtonToolbar, ButtonGroup, Button,
  FormGroup, FormControl, Overlay} from 'react-bootstrap';

class EditSongPopover extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };

    let modeCreate = this.props.modeCreate === true;
    let style = modeCreate ? "success" : "primary";
    let icon = modeCreate ? "glyphicon glyphicon-plus-sign" :
      "glyphicon glyphicon-pencil";
    let title = modeCreate ? "Add Song" : "Edit Song";

    this.state = {
      modeCreate: modeCreate,
      name: this.props.name,
      icon: icon,
      style: style,
      title: title,
      artist: this.props.artist,
      songId: this.props.songId,
      show: false
    };

  }

  render(){

    return (
      <ButtonToolbar>
        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={this}>

          <Popover title={this.state.title}>
            <div>
              <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Song Title"/>
                  <br/>
                <FormControl
                  type="text"
                  value={this.state.artist}
                  placeholder="Artist"/>
              </FormGroup>

              <div className="pull-right">
                <ButtonToolbar className="text-right">
                  <ButtonGroup bsSize="small">
                    <Button bsStyle="success">Save</Button>
                    <Button bsStyle="danger">Remove</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                <br/>
              </div>
            </div>
          </Popover>
        </Overlay>

        <Button className="pull-right" bsSize="xsmall"
          bsStyle={this.state.style}
          onClick={this.handleClick}>
            <span className={this.state.icon}/>
        </Button>
      </ButtonToolbar>

    );
  }
}

export default EditSongPopover;
