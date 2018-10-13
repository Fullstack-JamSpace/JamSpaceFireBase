import React, { Component } from 'react';
import { Menu, Segment, Label } from 'semantic-ui-react';
import { StreamPage } from '.';
import { FollowButton } from './follow-button';
import { StreamerAbout } from './streamer-about'
import { EditProfileButton } from './edit-profile-button'
import '../css/stream-nav.css';
import { withOnSnapshot } from './with-on-snapshot';

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
    const { user } = this.props;
    const { displayName } = this.props.match.params;
    const FollowButtonWithOnSnapshot = withOnSnapshot(FollowButton, displayName);
    const StreamerAboutWithOnSnapshot = withOnSnapshot(StreamerAbout, displayName);
    const EditProfileButtonWithOnSnapshot = withOnSnapshot(EditProfileButton);
    const isStreamer = user.displayName === displayName;
    return user && (
      <div>
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
          {!isStreamer ? 
            (<Menu.Menu position="right">
              <FollowButtonWithOnSnapshot />
            </Menu.Menu>)
            : activeItem === 'stream' ? 
                (<Menu.Menu id="live-label" position="right">
                  <Label id="live-label-text" color="red"
                    icon="white circle" content='LIVE' horizontal/>
                 </Menu.Menu>)
              : (<Menu.Menu position="right">
                  <EditProfileButtonWithOnSnapshot />
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
