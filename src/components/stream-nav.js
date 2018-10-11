import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { FollowButton } from './follow-button';
import { StreamPage, StreamerAbout } from '.';
import '../css/stream-nav.css'
// import * as firebase from 'firebase';
// import db from '../firebase';
import { getCurrentUser, getStreamer } from '../utils'
import { withOnSnapshot } from './with-on-snapshot'

export default class StreamNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'stream',
      isStreamer: false
    }
    this.user = this.props.user;
    this.streamer = {}
    this.streamer.displayName= this.props.match.params.displayName
    this.FollowButtonWithOnSnapshot = withOnSnapshot(FollowButton, this.streamer.displayName)
    // this.StreamPageWithOnSnapshot = withOnSnapshot(StreamPage,  this.streamer.displayName)
    // this.StreamerAboutWithOnSnapshot = withOnSnapshot(StreamerAbout,  this.streamer.displayName)
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

    this.setState({isStreamer: this.user.displayName === this.streamer.displayName})

    } catch (error) {
      console.log(error);
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, isStreamer } = this.state;

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
          { !this.state.isStreamer && this.user &&
          <Menu.Menu position="right">
            <this.FollowButtonWithOnSnapshot />
          </Menu.Menu>
          }
        </Menu>

        <Segment basic className='stream-window'>
          { activeItem === 'stream' ?
            <StreamPage isStreamer={this.state.isStreamer} displayName={this.streamer.displayName} />
            : <StreamerAbout name={this.streamer.displayName}/>
          }

      </Segment>
      </div>
    );
  }
}
