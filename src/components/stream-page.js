import React from 'react';
import '../css/stream.css'
import { StreamerVid, ViewerVid, StreamTitleCat } from '.';
import ChatRoom from './chat-room'
import { withOnSnapshot } from './with-on-snapshot'

const StreamPage = props => {
  // removed ', clearChat' from below to stop the console.log linter error
  const { displayName, isStreamer } = props;
  const ChatRoomWithOnSnapshot = withOnSnapshot(ChatRoom, displayName)

  return (

    isStreamer ?
    <div className='flex stream-root'>
      <div className='stream-window column'>
        <StreamerVid displayName={displayName} />
        <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
      </div>
      <div>
        <ChatRoomWithOnSnapshot displayName={displayName} />
      </div>
    </div>
    :
    <div className='flex stream-root'>
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
