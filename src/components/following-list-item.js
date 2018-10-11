import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import '../css/following.css';

export const FollowingListItem = props => {
  const { streamer } = props;
  const { displayName, isStreaming } = streamer;

  return (
    <List.Item
      as={Link}
      to={`/channels/${displayName}`}
      className="following-item"
      key={displayName}
    >
      {displayName}

      <List.Content floated="right">
        {isStreaming ? (
          <i className="red circle icon" />
        ) : (
          <i disabled className="grey circle icon" />
        )}
      </List.Content>
    </List.Item>
  );
};
