import Peer from 'peerjs';
import React, { Component } from 'react';

export default class StreamerVid extends Component {
  constructor () {
    super();
  }

  componentDidMount() {
    let { displayName } = this.props
    let streamerPeerId = displayName;

    const peer = new Peer(streamerPeerId);
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    const myVideo = document.getElementById('myVideo');
    let streamerStream;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        myVideo.srcObject = stream;
        streamerStream = stream;
      });

    let call;
    peer.on('connection', async conn => {
      call = peer.call(conn.peer, streamerStream)
      // console.log('conected - streamerStream', streamerStream);
      // console.log('conected - conn object', conn);
      // console.log('conected - conn.peer', conn.peer);
      // console.log('connections', peer.connections);
      // console.log('connections - CALL MADE');
    });

  }

  render() {

    return (
      <div>
        <video id="myVideo" autoPlay muted />
      </div>
    );
  }
}


