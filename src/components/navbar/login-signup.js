import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../css/navbar.css';

export const LoginSignup = props => (
  <Fragment>
      <Menu.Item
        as={Link} to="/login"
        className="nav-item"
        name="login"
        active={props.activeItem === 'login'}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        as={Link} to="/signup"
        className="nav-item"
        name="Sign Up"
        active={props.activeItem === 'Sign Up'}
        onClick={props.handleItemClick}
      />
  </Fragment>
);
