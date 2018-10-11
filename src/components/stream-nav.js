import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { FollowButton } from './follow-button';
import { StreamPage, StreamerAbout } from '.';
import '../css/stream-nav.css'
import * as firebase from 'firebase';
import db from '../firebase';
import { getCurrentUser } from '../utils'
import { withUser } from './with-user'

export default class StreamAboutMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'stream',
      isStreamer: false,
      currentUser: ''
    }
    this.FollowButtonWithUser = withUser(FollowButton, this.props.match.params.displayName)
    this.StreamPageWithUser = withUser(StreamPage,  this.props.match.params.displayName)
    this.StreamerAboutWithUser = withUser(StreamerAbout,  this.props.match.params.displayName)
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

      const currentUser = await getCurrentUser();
      this.setState({ currentUser });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    console.log('STREAM NAV UPDATE')
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, isStreamer, currentUser } = this.state;
    const { displayName } = this.props.match.params;
    console.log('STREAM NAV PROPS', this.props)
    return (
      <div>
        <Menu borderless id='stream-nav'>
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
          { !isStreamer && currentUser &&
          <Menu.Menu position="right">
            <this.FollowButtonWithUser />
          </Menu.Menu>
          }
        </Menu>

        <Segment basic className='stream-window'>
          { activeItem === 'stream' ?
            <StreamPage isStreamer={isStreamer} displayName={displayName}/>
            : <StreamerAbout name={displayName}/>
          }

      </Segment>
      </div>
    );
  }
}
