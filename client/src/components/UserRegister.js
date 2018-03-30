import React from 'react';
import {Jumbotron, Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button, PageHeader} from 'react-bootstrap';

/**
Component: UserRegister
This is the view shown to the user for creating an account.
*/

const UserRegister = () => (
	<div>
        <Jumbotron>
        	<Grid>
        	<Row className = "show-grid">
        		<Col>
					<PageHeader>
					  <small>Create your personal account!</small>
					</PageHeader>
				</Col>
			</Row>
        	<br/>
        		<Row className = "show-grid">
        			<Col xs={12} md={8}>
				      <form>
				        <FormGroup>
				          <ControlLabel>Username</ControlLabel>
				          <FormControl
				            type="text"
				            id="username"/>
				            <br/>
				          <ControlLabel>Email address</ControlLabel>
				          <FormControl
				            type="text"
				            id="email"/>
				            <HelpBlock>We will occasionally send updates about your account to this inbox. We will never share your email address with anyone.</HelpBlock>
				            <br/>
				          <ControlLabel>Password</ControlLabel>
				          <FormControl
				            type="password"
				            id="password"/>
				            <HelpBlock>Use at least one upper case, one lower case and one numeric character.</HelpBlock>
				        </FormGroup>
				        <Button className="btn btn-success" type="submit">Create an account</Button>
				      </form>
				    </Col>
			    </Row> 
		    </Grid>
        </Jumbotron>
	</div>

);

export default UserRegister; 