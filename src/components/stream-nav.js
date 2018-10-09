import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import FollowButton from './follow-button';
import { StreamPage, StreamerAbout } from '.';
import '../css/stream-nav.css'
import * as firebase from 'firebase';
import db from '../firebase';

export default class StreamAboutMenu extends Component {
  constructor(){
    super();
    this.state = {
      activeItem: 'stream',
      isStreamer: false
    }
  }

  async componentDidMount(){
    try {
      let jammer = [];
      const channelOwner = this.props.match.params.displayName;
      const jammerRef = await db.collection('jammers').where('displayName', '==', `${channelOwner}`).get();

      await jammerRef.forEach(x => {
        if (x.data()) jammer.push(x.data());
      });

      await firebase.auth().onAuthStateChanged(user => {
        if ((jammer.length && user) && (user.email === jammer[0].email)) this.setState( { isStreamer: true })
    });
    } catch (error) {
      console.log(error);
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, isStreamer } = this.state;
    const { displayName } = this.props.match.params;

    return (
      <div>
        <Menu borderless>
          <Menu.Item
            name="stream"
            active={activeItem === 'stream'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="about"
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          { !isStreamer &&
          <Menu.Menu position="right">
            <FollowButton displayName={displayName} />
          </Menu.Menu>
          }
        </Menu>

        <Segment basic>
          { activeItem === 'stream' ?
            <StreamPage isStreamer={isStreamer} displayName={displayName}/>
            : <StreamerAbout name={displayName}/>
          }
        </Segment>
      </div>
    );
  }
}
