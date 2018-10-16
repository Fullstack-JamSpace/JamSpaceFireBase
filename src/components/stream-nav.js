import React, { Component } from 'react';
import { Menu, Segment, Label } from 'semantic-ui-react';
import { StreamPage } from '.';
import { FollowButton } from './follow-button';
import { StreamerAbout } from './streamer-about'
import { StreamerAboutEditButton } from './streamer-about-edit-button'
import '../css/stream-nav.css';
import { withOnSnapshot } from './with-on-snapshot';
// import { getCurrentUser } from '../utils'

export default class StreamNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'stream'
    }
  }

  handleClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const { handleClick } = this
    const { activeItem } = this.state
    // const { user } = this.props;
    // const { displayName } = this.props.match.params;
    const user = this.props.user
    const displayName = this.props.displayName
    console.log('stream-nav.js | rendering | displayName', displayName, 'props', this.props, 'user', user )

    const FollowButtonWithOnSnapshot = withOnSnapshot(FollowButton, displayName);
    const StreamerAboutWithOnSnapshot = withOnSnapshot(StreamerAbout, displayName);
    const StreamerAboutEditButtonWithOnSnapshot = withOnSnapshot(StreamerAboutEditButton);
    const isStreamer = user && user.displayName === displayName;
    return (
      <div id='nav-root'>
        <Menu borderless id="stream-nav">
          <Menu.Item
            name="stream"
            active={activeItem === 'stream'}
            onClick={handleClick}
          />
          <Menu.Item
            name="about"
            active={activeItem === 'about'}
            onClick={handleClick}
          />
          {/* if your logged in (user exists) and not the streamer, then show follow button */}
          {user && !isStreamer ?
            (<Menu.Menu position="right">
              <FollowButtonWithOnSnapshot />
            </Menu.Menu>)
            // if not logged in (no user exists) then show nothing where follow button would go
            : !user ?
            null
            // if you get this far, you're logged in and the streamer
            // if streaming show 'live', else you're on the about page, so show the edit button
            : activeItem === 'stream' ?
                (<Menu.Menu id="live-label" position="right">
                  <Label id="live-label-text" color="red"
                    icon="white circle" content='LIVE' horizontal/>
                 </Menu.Menu>)
              : (<Menu.Menu position="right">
                  <StreamerAboutEditButtonWithOnSnapshot />
                </Menu.Menu>)
          }
        </Menu>

        <Segment basic className="stream-window">
          {activeItem === 'stream' ? (
            <StreamPage isStreamer={isStreamer} displayName={displayName} />
          ) : (
            <StreamerAboutWithOnSnapshot />
          )}
        </Segment>
      </div>
    );
  }
};
