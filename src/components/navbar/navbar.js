import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import logo from '../../pics/logo.jpg';
import '../../css/navbar.css';
import {LoginSignup} from './login-signup';
import * as firebase from 'firebase';
import db from '../../firebase';
import { ProfileIcon } from './profile-icon';

export const Navbar = props => {
  const { user } = props
  let activeItem = ''
  const handleItemClick = (e, { name }) => activeItem = name
  const handleLogoClick = () => activeItem = ''
  return (
    <div className="header App-header">
      <Link to="/" onClick={handleLogoClick}>
        <div className="logo-and-text">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 id="header-logo-text">Jam Space</h3>
        </div>
      </Link>
      <div className="nav-options">
        <Menu inverted pointing secondary >
            <Menu.Item
              className='borderless'
              as={Link} to="/"
              name="Browse by Category"
              active={activeItem === 'Browse by Category'}
              onClick={handleItemClick}
            />
            <Menu.Item
              className='borderless'
              as={Link} to="/channels"
              name="Browse All Channels"
              active={activeItem === 'Browse All Channels'}
              onClick={handleItemClick}
            />
          <Menu.Menu position="right">
          {
            (user && user.email) ? <ProfileIcon user={user}/>
            : <LoginSignup activeItem={activeItem} handleItemClick={handleItemClick} />
          }
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  );
}
