import React, { Fragment, Component } from 'react';
import { StreamerVid, ViewerVid, StreamTitleCat, ChatRoom } from '.';
import '../css/stream.css'


export default class StreamPage extends Component {
  render(){
    const { displayName, isStreamer } = this.props;
    return (
      isStreamer ?
      <div className='flex'>
        <div className='stream-window column'>
          <StreamerVid displayName={displayName} />
          <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
        </div>
        <div>
          <ChatRoom displayName={displayName} />
        </div>
      </div>
         :
         <div className='flex'>
          <div className='stream-window column'>
            <ViewerVid displayName={displayName} />
            <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
          </div>
          <div>
            <ChatRoom displayName={displayName} />
          </div>
        </div>
    )
  }
}
