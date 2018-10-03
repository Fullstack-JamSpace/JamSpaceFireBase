import Peer from 'peerjs';
import React, { Component } from 'react';

// OB: chop the logs
export default class Streamer extends Component {
  componentDidMount() {
    let streamerPeerId = 'streamerJavierLilahJackie';

    const peer = new Peer(streamerPeerId);
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    // OB: considered an anti-pattern in react to use DOM methods, the recommended altnerative is refs: https://reactjs.org/docs/refs-and-the-dom.html
    const myVideo = document.getElementById('myVideo');
    let streamerStream;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        myVideo.srcObject = stream;
        streamerStream = stream;
      });

    // OB: soon you might want to attach this to the instance, `this.call = ...` so that you can use it in other lifecycle hooks, e.g. `componentWillUnmount`
    let call;
    peer.on('connection', conn => {
      console.log('conected - streamerStream', streamerStream);
      console.log('conected - conn object', conn);
      console.log('conected - conn.peer', conn.peer);
      console.log('connections', peer.connections);
      call = peer.call(conn.peer, streamerStream)
      console.log('connections - CALL MADE');
    });

  }
  // OB: should disconnect peer / call when component unmounts
  // OB: should stop stream when component unmounts

  render() {
    return (
      <div>
        <p>hi streamer</p>
        <video id="myVideo" autoPlay muted />
      </div>
    );
  }
}


