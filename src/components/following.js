import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import '../css/following.css';
import { withOnSnapshot } from './with-on-snapshot';
import { FollowingListItem } from './following-list-item'


export const Following = (props) => {
  const { following } = props.user
  return (
    <div id="following">
      <h3 id='follow-header'>FOLLOWING</h3>
      <Segment inverted id='following-list'>
        <List divided inverted >
          { !following
          ? <h2>Follow somebody already cmon</h2>
          : following.map(userName => {
              let FollowingListItemWithOnSnapshot = withOnSnapshot(FollowingListItem, userName)
              return userName !== ''
              ?
              <FollowingListItemWithOnSnapshot />
              : <List.Item className='following-item-empty'>''</List.Item>
            })
          }
        </List>
      </Segment>
    </div>
  );
}
