import React from 'react';
import { Navbar, Grid, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import mainLogo from'../images/icon.png';

/**
Component: NavigationBar
Global component to show the navigation bar with the relevant application
access points.
*/

const Header = () => (

  <Navbar inverse fixedTop>
    <Grid>

      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
            <a>
              <img src={mainLogo} width="30" height="30" alt=""/>
              Lyrics Trivia
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
          title="👤 My Profile"
          id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Sign In</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.2}>
              <span role="img" aria-label="pen">✏️</span>
              Register
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

    </Grid>
  </Navbar>

);

export default Header;
