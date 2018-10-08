import React, { Fragment, Component } from 'react';
import { StreamerVid, ViewerVid, StreamTitleCat } from '.';
import '../css/stream.css'



// To get here, need to have visited /channels/:displayName
// Using props.match.params.streamerDisplayName(?) we can pull displayName from URL and use that to determine the user being viewed
// If the logged in user is the user in the URL, offer option start/end stream.
// Otherwise, let them view only.

export default class StreamPage extends Component {
  render(){
    const { displayName, isStreamer } = this.props;
    return (
      isStreamer ?
        <div className='stream-window'>
          <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
          <StreamerVid displayName={displayName} />
        </div> :
        <div className='stream-window'>
          <StreamTitleCat isStreamer={isStreamer} displayName={displayName}/>
          <ViewerVid displayName={displayName} />
        </div>
    )
  }
}
