import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../css/navbar.css';

export const LoginSignup = props => (
  <Fragment>
    <Link to="/login">
      <Menu.Item
        className="nav-item"
        name="login"
        active={props.activeItem === 'login'}
        onClick={props.handleItemClick}
      />
    </Link>
    <Link to="/signup">
      <Menu.Item
        className="nav-item"
        name="Sign Up"
        active={props.activeItem === 'Sign Up'}
        onClick={props.handleItemClick}
      />
    </Link>
  </Fragment>
);
