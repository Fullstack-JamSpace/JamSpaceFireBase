import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import logo from '../../pics/logo.jpg';
import '../../css/navbar.css';
import {LoginSignup} from './login-signup';
import * as firebase from 'firebase';
import db from '../../firebase';
import { ProfileIcon } from './profile-icon';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      jammer: false,
      jammerAuth: false
      // OB/JD: have `activeItem` on here with some default state
    };
  }

  // OB/JD: could use a higher-order component, e.g. `withUser(Navbar)`
  async componentDidMount(){
    await firebase.auth().onAuthStateChanged(async jammer => {
      if (jammer) this.setState({ jammerAuth : jammer });
      const jammerRef = db.collection('jammers').doc(`${this.state.jammerAuth.email}`);
      const jam = await jammerRef.get();
      this.setState({ jammer: jam.data() })
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLogoClick = () => this.setState({ activeItem: '' })

  render() {
    const { activeItem, jammer } = this.state;
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
                as={Link} to="/"
                name="Browse by Category"
                active={activeItem === 'Browse by Category'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link} to="/channels"
                name="All Live Channels"
                active={activeItem === 'All Live Channels'}
                onClick={this.handleItemClick}
              />
            <Menu.Menu position="right">
            {
              (jammer && jammer.email) ? <ProfileIcon jammer={jammer}/>
              : <LoginSignup activeItem={activeItem} handleItemClick={this.handleItemClick} />
            }
            </Menu.Menu>
          </Menu>
        </div>
      </div>
    );
  }
}
