import React from 'react';
import {Jumbotron, Grid, Row, Col, FormGroup,
	FormControl, Button, Alert} from 'react-bootstrap';

import UserService from '../controllers/UserService.js';

/**
Component: Login
This is the view shown to the user for logging into the application.
*/

let objUtils = require('../utils/ObjectUtils.js');

class Login extends React.Component {

	constructor(props){
    super(props);

		this.state =
		{
			inError : false,
			errorContents : '',
			usernameText : '',
			passwordText: '',
		};

		this.userService = new UserService();
		this.prepareBindings();
	}

	prepareBindings(){
		this.loginButtonClicked = this.loginButtonClicked.bind(this);
		this.passwordChanged = this.passwordChanged.bind(this);
		this.usernameChanged = this.usernameChanged.bind(this);
		this.errorFound = this.errorFound.bind(this);
		this.loginSuccess = this.loginSuccess.bind(this);
	}

	loginButtonClicked(){

			if(objUtils.isEmpty(this.state.usernameText)
			|| objUtils.isEmpty(this.state.passwordText)){
					this.setState({inError: true,
						errorContents : 'Fields cannot be empty!'});
					return;
			}

		this.userService.tryLogin(
			this.state.usernameText, this.state.passwordText,
			this.loginSuccess, this.errorFound);
	}

	loginSuccess(data){
		this.props.history.push('/');
	}

	errorFound(e){
		let errorMessage = e.error;
		if (errorMessage === undefined) {
			errorMessage = 'Something happened. Undefined Error.';
		}
		this.setState({inError: true, errorContents : errorMessage});
	}

	passwordChanged(e){
		this.setState({passwordText : e.target.value});
	}

	usernameChanged(e){
		this.setState({usernameText : e.target.value});
	}

	render(){
		return (
			<div>
		        <Jumbotron className="spacerBottom">
		        	<Grid>
								<Row className = "show-grid">
			        		<Col>
										<h2><small>
										<span role="img" aria-label="lock">🔓</span>
										Please input your credentials.
										</small></h2>
									</Col>
								</Row>
		        		<br/>
		        		<Row className = "show-grid">
		        			<Col></Col>
		        			<Col xs={12} md={8}>
						      <form>
						        <FormGroup>
						          <FormControl
						            type="text"
												onChange={this.usernameChanged}
						            placeholder="Username"/>
						            <br/>
						          <FormControl
						            type="password"
												onChange={this.passwordChanged}
						            placeholder="Password"/>
						        </FormGroup>
										<Alert bsStyle="danger"
										className={this.state.inError ? '' : 'hidden'}>
											Error: {this.state.errorContents}
										</Alert>
						        <Button className="btn btn-primary"
										onClick={this.loginButtonClicked}>
										Login
										</Button>
						      </form>
						    </Col>
					    </Row>
				    </Grid>
		        </Jumbotron>
			</div>
		);
	}
}

export default Login;
