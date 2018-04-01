import React from 'react';
import {Jumbotron, Grid, Row, Col, FormGroup,
	ControlLabel, FormControl, HelpBlock, Button, Alert} from 'react-bootstrap';

import UserService from '../controllers/UserService.js';
import {Constants} from '../utils/Constants.js';

/**
Component: UserRegister
This is the view shown to the user for creating an account.
*/

let objUtils = require('../utils/ObjectUtils.js');

class UserRegister extends React.Component {

	constructor(props){
    super(props);
		this.prepareBindings();
		this.state =
		{
			inError : false,
			errorContents : '',
			usernameText : '',
			passwordText: '',
			countryIdentifier: '',
			confirmPasswordText: '',
			emailText: 'dummy@dummy.com',
			minPassSize: 6
		};

		this.userService = new UserService();
		this.prepareBindings();

	}

	prepareBindings(){
		this.passwordChanged = this.passwordChanged.bind(this);
		this.usernameChanged = this.usernameChanged.bind(this);
		this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
		this.emailChanged = this.emailChanged.bind(this);
		this.countryChanged = this.countryChanged.bind(this);
		this.registerButtonClicked = this.registerButtonClicked.bind(this);
		this.setError = this.setError.bind(this);
		this.hideErrors = this.hideErrors.bind(this);
		this.errorFound = this.errorFound.bind(this);
		this.registerSuccess = this.registerSuccess.bind(this);
	}

	setError(text){
		this.setState({inError: true, errorContents : text});
	}

	hideErrors(){
		this.setState({inError : false});
	}

	passwordChanged(e){
		this.setState({passwordText : e.target.value});
	}

	usernameChanged(e){
		this.setState({usernameText : e.target.value});
	}

	confirmPasswordChanged(e){
		this.setState({confirmPasswordText : e.target.value});
	}

	emailChanged(e){
		this.setState({emailText : e.target.value});
	}

	countryChanged(e){
		this.setState({countryIdentifier : e.target.value});
	}

	registerButtonClicked(){

		// VALIDATION.

		if(objUtils.isEmpty(this.state.usernameText)
		|| objUtils.isEmpty(this.state.passwordText)
		|| objUtils.isEmpty(this.state.confirmPasswordText)
		|| objUtils.isEmpty(this.state.countryIdentifier)
		|| objUtils.isEmpty(this.state.emailText)){
				this.setError('Fields cannot be empty!');
				return;
		}

		if(this.state.confirmPasswordText !== this.state.passwordText){
			this.setError('Passwords must match.');
			return;
		}

		if(!objUtils.isValidEmail(this.state.emailText)){
			this.setError('Invalid e-mail address.');
			return;
		}

		// TODO: Improve this password policy.
		if(this.state.passwordText.length < this.state.minPassSize){
			this.setError('Password is too short!');
			return;
		}

		this.hideErrors();

		this.userService.tryCreate(
			this.state.usernameText,
			this.state.passwordText,
			this.state.emailText,
			this.state.countryIdentifier,
			this.registerSuccess, this.errorFound);

	}

	registerSuccess(data){
		this.props.history.push('/login');
	}

	errorFound(e){
		console.log(e);
		let errorMessage = e.error;
		if (errorMessage === undefined) {
			errorMessage = 'Something happened. Undefined Error.';
		}
		this.setError(errorMessage);
	}

	createSelectItems() {
     let items = [ <option key="select" value="">
		 		Select a country ... </option> ];

     for (let i = 0; i < Constants.countries.length; i++) {
			    let country = Constants.countries[i];
          items.push(
						<option key={country.name} value={country.id}>
						{country.flag + ' ' + country.name}
						</option>);
     }
     return items;
 	}

	render(){
		return (
			<div>
	        <Jumbotron className="spacerBottom">
	        <Grid>
	        	<Row className = "show-grid">
	        		<Col>
								<h2><small> Create your personal account! </small></h2>
							</Col>
						</Row>
	        	<br/>
	        	<Row className = "show-grid">
	        			<Col xs={12} md={8}>
					      <form>
					        <FormGroup>
					          <ControlLabel>
										<span role="img" aria-label="player">🎮</span>
										Username
										</ControlLabel>
					          <FormControl
											onChange={this.usernameChanged}
					            type="text"
					            id="username"/>
					            <br/>
										<ControlLabel>
										<span role="img" aria-label="map">🗺️</span>
										Country
										</ControlLabel>
							      <FormControl
										onChange={this.countryChanged}
										componentClass="select"
										placeholder="select">
							        {this.createSelectItems()}
							      </FormControl>
										<br/>
					          <ControlLabel>Password</ControlLabel>
					          <FormControl
											onChange={this.passwordChanged}
					            type="password"
					            id="password"/>
										<ControlLabel>Confirm Password</ControlLabel>
						        <FormControl
										 	onChange={this.confirmPasswordChanged}
						          type="password"
						          id="confirmPassword"/>
										<HelpBlock>
										<small>
											Your password must have at least ({this.state.minPassSize}
										 ) characters.
										</small>
										</HelpBlock>
					        </FormGroup>
									<Alert bsStyle="danger"
									className={this.state.inError ? '' : 'hidden'}>
										Error: {this.state.errorContents}
									</Alert>
					        <Button className="btn btn-success"
										onClick={this.registerButtonClicked}>
									Create an account
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

export default UserRegister;
