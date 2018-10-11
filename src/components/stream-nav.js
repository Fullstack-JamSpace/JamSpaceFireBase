import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { FollowButton } from './follow-button';
import { StreamPage, StreamerAbout } from '.';
import '../css/stream-nav.css'
// import * as firebase from 'firebase';
// import db from '../firebase';
// import { getCurrentUser, getStreamer } from '../utils'
import { withOnSnapshot } from './with-on-snapshot'

export default class StreamNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'stream'
    }
    this.user = this.props.user;
    this.displayName = this.props.match.params.displayName
    this.FollowButtonWithOnSnapshot = withOnSnapshot(FollowButton, this.displayName)
    // this.StreamPageWithOnSnapshot = withOnSnapshot(StreamPage,  this.displayName)
    // this.StreamerAboutWithOnSnapshot = withOnSnapshot(StreamerAbout,  this.displayName)
  }

  async componentDidMount(){
    try {


      //const streamer = getStreamer(this.displayName)

      // let jammer = [];
      // const channelOwner = this.props.match.params.displayName;
      // const jammerRef = await db.collection('jammers').where('displayName', '==', `${channelOwner}`).get();

      // await jammerRef.forEach(x => {
      //   if (x.data()) jammer.push(x.data());
      // });

      // await firebase.auth().onAuthStateChanged(user => {
      //   if ((jammer.length && user) && (user.email === jammer[0].email)) this.setState( { isStreamer: true })
    // });

    } catch (error) {
      console.log(error);
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    const tempIsStreamer = this.user.displayName === this.displayName

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
          { !tempIsStreamer && this.user &&
          <Menu.Menu position="right">
            <this.FollowButtonWithOnSnapshot />
          </Menu.Menu>
          }
        </Menu>

        <Segment basic className='stream-window'>
          { activeItem === 'stream' ?
            <StreamPage isStreamer={tempIsStreamer} displayName={this.displayName} />
            : <StreamerAbout name={this.streamer.displayName}/>
          }

      </Segment>
      </div>
    );
  }
}
