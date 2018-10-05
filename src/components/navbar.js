import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
// import '../semantic/dist/semantic.min.css';
//import 'semantic-ui-css/semantic.min.css';

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    return (
      <div className="header App-header">
        <h3>JamSpace Baby</h3>
        <Menu>
          <Menu.Item
            name="semantic"
            active={activeItem === 'semantic'}
            onClick={this.handleItemClick}
          >
            <Link to="/semantic">SemanticTest</Link>
          </Menu.Item>

          <Menu.Item
            name="signup"
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>

          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
          <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item
            name="streamer"
            active={activeItem === 'streamer'}
            onClick={this.handleItemClick}
          >
          <Link to="/streamer">Streamer</Link>
          </Menu.Item>

          <Menu.Item
            name="viewer"
            active={activeItem === 'viewer'}
            onClick={this.handleItemClick}
          >
           <Link to="/viewer">Viewer</Link> <br />
          </Menu.Item>

          <Menu.Item
            name="account"
            active={activeItem === 'account'}
            onClick={this.handleItemClick}
          >
           <Link to="/account">Account</Link> <br />
          </Menu.Item>

        </Menu>
      </div>
      )
  }

};



// <Menu>
{
  /* <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
  Browse
</Menu.Item> */
}

// <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
//   Submit
// </Menu.Item>

// <Menu.Menu position='right'>
//   <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
//     Sign Up
//   </Menu.Item>

//   <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
//     Help
//   </Menu.Item>
// </Menu.Menu>
// </Menu>
