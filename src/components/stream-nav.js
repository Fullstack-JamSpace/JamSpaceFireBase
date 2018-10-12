import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { FollowButton } from './follow-button';
import { StreamPage, StreamerAbout } from '.';
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
    const isStreamer = user.displayName === displayName;
    return (
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
          {!isStreamer &&
            user && (
              <Menu.Menu position="right">
                <FollowButtonWithOnSnapshot />
              </Menu.Menu>
            )}
        </Menu>

        <Segment basic className="stream-window">
          {activeItem === 'stream' ? (
            <StreamPage isStreamer={isStreamer} displayName={displayName} />
          ) : (
            <StreamerAbout name={displayName} />
          )}
        </Segment>
      </div>
    );    
  }
};
