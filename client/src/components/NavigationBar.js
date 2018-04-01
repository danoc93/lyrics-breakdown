import React from 'react';
import { Navbar, Grid, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import mainLogo from'../images/icon.png';
import UserService from '../controllers/UserService.js';

/**
Component: NavigationBar
Global component to show the navigation bar with the relevant application
access points.
*/

let objUtils = require('../utils/ObjectUtils.js');

class Header extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/
    /* Default values come from the Constants Service. */

    this.state = {
      currUserName : '',
      currUserId : '',
      isUserLoggedIn : false
    };

  }

  componentDidMount() {

    this.setState({isUserLoggedIn : UserService.isUserLoggedIn() });
    this.setState({currUserName : UserService.getCurrentUserName() });
    this.setState({currUserId : UserService.getCurrentUserId() });

  }

  render (){
    return (
    <Navbar inverse fixedTop>
      <Grid>

        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a>
                <img src={mainLogo} width="30" height="30" alt=""/>
                Lyrics Breakdown
              </a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/leaderboards">
              <NavItem eventKey={1} href="#">
               Leaderboards
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/information">
              <NavItem eventKey={2} href="#">
               Information
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3}
            title={
              '👤' + (this.state.isUserLoggedIn ?
              'Hi, '+this.state.currUserName : 'My Profile') }
            id="basic-nav-dropdown">
              <LinkContainer to="/login"
                className={objUtils.hideIf(this.state.isUserLoggedIn)}>
              <MenuItem eventKey={3.1}>Sign In</MenuItem>
              </LinkContainer>
              <MenuItem divider
               className={objUtils.hideIf(this.state.isUserLoggedIn)}/>
              <LinkContainer to="/register"
                className={objUtils.hideIf(this.state.isUserLoggedIn)}>
              <MenuItem eventKey={3.2}>
                <span role="img" aria-label="pen">✏️</span>
                Register
              </MenuItem>
              </LinkContainer>
              <LinkContainer to="/dashboard"
                className={objUtils.showIf(this.state.isUserLoggedIn)}>
              <MenuItem eventKey={3.3}>
                <span role="img" aria-label="dashboard">📒</span>
                My Dashboard
              </MenuItem>
              </LinkContainer>
              <MenuItem divider
                className={objUtils.showIf(this.state.isUserLoggedIn)}/>
              <LinkContainer to="/logout"
                className={objUtils.showIf(this.state.isUserLoggedIn)}>
              <MenuItem eventKey={3.4}>
              <span role="img" aria-label="door">🚪</span>
                Log out
              </MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Grid>
    </Navbar>
    );
  }
}

export default Header;
