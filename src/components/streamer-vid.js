import Peer from 'peerjs';
import React, { Component } from 'react';

export default class StreamerVid extends Component {
  // constructor () {
  //   super();
  // }

  componentDidMount() {
    let { displayName } = this.props
    let streamerPeerId = displayName;

    const peer = new Peer(streamerPeerId, {host: 'jampspace-01-peerjs-01.herokuapp.com', port: 80});
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    const myVideo = document.getElementById('myVideo');

    let streamerStream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        myVideo.srcObject = stream;
        streamerStream = stream;
      });


    // omri has said that we will want to properly close a connection when a user
    // leave the stream page and that to do so we wil need to assign the peer.call
    // to a var (const, let, whatev) and then in componentDidUnmount call
    // call.disconnect() or something
    // as of now, commenting this out and line 38 b/c linter is pissed about this
    let call;
    peer.on('connection', async conn => {
      peer.call(conn.peer, streamerStream)
      call = peer.call(conn.peer, streamerStream)

      console.log('conected - streamerStream', streamerStream);
      console.log('conected - conn object', conn);
      console.log('conected - conn.peer', conn.peer);
      console.log('connections', peer.connections);
      console.log('connections - CALL MADE');
    });

  }

  render() {

    return (
      <div>
        <video id="myVideo" autoPlay muted/>
      </div>
    );
  }
}
