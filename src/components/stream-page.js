import React, { Fragment, Component } from 'react';
import { StreamerVid, ViewerVid, StreamTitleCat, ChatRoom } from '.';
import '../css/stream.css'


export default class StreamPage extends Component {
  render(){
    const { displayName, isStreamer } = this.props;
    return (
      isStreamer ?
        <div className='stream-window'>
          <StreamerVid displayName={displayName} />
          <ChatRoom displayName={displayName} />
          <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
        </div> :
        <div className='stream-window'>
          <ViewerVid displayName={displayName} />
          <ChatRoom displayName={displayName} />
          <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
        </div>
    )
  }
}
