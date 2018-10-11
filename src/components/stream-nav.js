import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { FollowButton } from './follow-button';
import { StreamPage, StreamerAbout } from '.';
import '../css/stream-nav.css';
import { withOnSnapshot } from './with-on-snapshot';

const StreamNav = props => {
  const user = props.user;
  const displayName = props.match.params.displayName;
  const FollowButtonWithOnSnapshot = withOnSnapshot(FollowButton, displayName);

  let activeItem = 'stream';

  const handleItemClick = (e, { name }) => (activeItem = name);

  const isStreamer = user.displayName === displayName;

  return (
    <div>
      <Menu borderless id="stream-nav">
        <Menu.Item
          name="stream"
          active={activeItem === 'stream'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="about"
          active={activeItem === 'about'}
          onClick={handleItemClick}
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
};

export default StreamNav
