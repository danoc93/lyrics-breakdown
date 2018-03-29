import React from 'react';
import { Navbar } from 'react-bootstrap';

/**
Component: Footer
Defines the common footer for the web application.
*/

const Footer = () => (

  <Navbar inverse fixedBottom>
    <div className="footerText">
      2018, Lyrics Trivia - Toronto, ON, Canada
    </div>
  </Navbar>
);

export default Footer;
