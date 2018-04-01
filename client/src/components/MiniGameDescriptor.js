import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
Component: MiniGameDescriptor
Component to describe a single MiniGame.
*/

class MiniGameDescriptor extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      title : this.props.title,
      gameId : this.props.gameId,
      description: this.props.description,
      image : this.props.image,
      referencePath: '/game/'+this.props.gameId+'/'+this.props.title
    };

  }

  render (){
    return (
      <Col sm={6} md={4}>
        <div className="thumbnail">
          <img src={this.state.image} alt=""/>
          <div className="caption">
            <h3>{this.state.title}</h3>
            <p> {this.state.description}</p>
            <div>
              <LinkContainer to={this.state.referencePath}>
              <div className="centerText">
                <Button className="btn btn-success">
                  Play
                </Button>
              </div>
              </LinkContainer>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default MiniGameDescriptor;
