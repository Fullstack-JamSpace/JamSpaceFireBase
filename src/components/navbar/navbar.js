import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import logo from '../../pics/logo.jpg';
import '../../css/navbar.css';
import {LoginSignup} from './login-signup';
import * as firebase from 'firebase';
import db from '../../firebase';
import { ProfileIcon } from './profile-icon';
import { getCurrentUser } from '../../utils'

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      userAuth: false,
      activeItem: ''
    };
  }

  async componentDidMount(){
    const user = await getCurrentUser()
    this.setState({ user: user })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLogoClick = () => this.setState({ activeItem: '' })

  render() {
    const { activeItem, user } = this.state;
    return (
      <div className="header App-header">
        <Link to="/" onClick={this.handleLogoClick}>
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
                onClick={this.handleItemClick}
              />
              <Menu.Item
                className='borderless'
                as={Link} to="/channels"
                name="Browse All Channels"
                active={activeItem === 'Browse All Channels'}
                onClick={this.handleItemClick}
              />
            <Menu.Menu position="right">
            {
              (user && user.email) ? <ProfileIcon user={user}/>
              : <LoginSignup activeItem={activeItem} handleItemClick={this.handleItemClick} />
            }
            </Menu.Menu>
          </Menu>
        </div>
      </div>
    );
  }
}
