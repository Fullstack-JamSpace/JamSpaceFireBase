import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import { List, Segment } from 'semantic-ui-react';
import '../css/following.css';
import { getCurrentUser } from '../utils'

export const Following = (props) => {
  console.log('FOLLOWING COMPONENT')
  const { following } = props.user
  const isStreaming = true
  return (
    <div id="following">
      <p>FOLLOWING:</p>
      <Segment inverted>
        <List divided inverted id='following-list'>
          { !following
          ? <h2>Follow somebody already cmon</h2>
          : following.map(userName => {
              return userName !== ''
              ? (
                <List.Item as={Link} to={`/channels/${userName}`} className='following-item' key={userName}>{userName}
                  <List.Content floated='right'>
                    { isStreaming ? <i className='red circle icon'></i> : <i disabled className='grey circle icon'></i> }
                  </List.Content>
                </List.Item>
              )
              : <List.Item className='following-item-empty'>''</List.Item>
            })
          }
        </List>
      </Segment>
    </div>
  );
}
