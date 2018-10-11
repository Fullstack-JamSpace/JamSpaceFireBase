import React, { Fragment, Component } from 'react';
import '../css/stream.css'
import { StreamerVid, ViewerVid, StreamTitleCat } from '.';
import ChatRoom from './chat-room'
import { withOnSnapshot } from './with-on-snapshot'

const StreamPage = props => {
  const { displayName, isStreamer, clearChat } = props;
  const ChatRoomWithOnSnapshot = withOnSnapshot(ChatRoom, displayName)
  return (
    isStreamer ?
    <div className='flex'>
      <div className='stream-window column'>
        <StreamerVid displayName={displayName} />
        <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
      </div>
      <div>
        <ChatRoomWithOnSnapshot displayName={displayName} />
      </div>
    </div>
    :
    <div className='flex'>
      <div className='stream-window column'>
        <ViewerVid displayName={displayName} />
        <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
      </div>
      <div>
        <ChatRoomWithOnSnapshot displayName={displayName} />
      </div>
   </div>
  )
}

export default StreamPage