import React from 'react';
import {Jumbotron, Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

/**
Component: Login
This is the view shown to the user for logging into the application.
*/

const Login = () => (
	<div>
        <Jumbotron>
        	<Grid>
        		<br/>
        		<Row className = "show-grid">
        			<Col></Col>
        			<Col xs={12} md={8}>
				      <form>
				        <FormGroup controlId="registerForm">
				          <FormControl
				            type="text"
				            placeholder="Username"/>
				            <br/>
				          <FormControl
				            type="password"
				            placeholder="Password"/>
				        </FormGroup>
				        <Button className="btn btn-primary" type="submit">Login</Button>
				      </form>
				    </Col>
			    </Row> 
		    </Grid>
        </Jumbotron>
	</div>

);

export default Login; 