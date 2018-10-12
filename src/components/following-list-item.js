import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import '../css/following.css';

export const FollowingListItem = props => {
  const { streamer } = props;
  // const { displayName, isStreaming } = streamer ? streamer;

  return (
    streamer ?
    <List.Item
      as={Link}
      to={`/channels/${streamer.displayName}`}
      className="following-item"
      key={streamer.displayName}
    >
      {streamer.displayName}

      <List.Content floated="right">
        {streamer.isStreaming ? (
          <i className="red circle icon" />
        ) : (
          <i disabled className="grey circle icon" />
        )}
      </List.Content>
    </List.Item>
    : null
  );
};
