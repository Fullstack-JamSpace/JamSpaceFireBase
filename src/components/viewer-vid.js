import Peer from 'peerjs';
import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class ViewerVid extends Component {
  constructor () {
    super();
    this.state = {
      peer: '',
      conn: null,
      call: null,
      stream: null
    }
  }

  // This func it bound to state so that it can be used to store the incomming call
  // on state when a streamer calls to send viewer the stream. We want to store the
  // call so that we can properly destroy it when the connection ends
  onCallAnswerCallHandleStreamAndSetState = (call, myVideoComponent) => {
    this.setState({
      call: call
    })
    call.answer();
    call.on('stream', (stream) => this.onStreamHandleStreamAndSetState(stream, myVideoComponent) );
  }

  // This func it bound to state so that it can be used to store the incomming stream
  // on state when a streamer calls to send viewer the stream. We want to store the
  // stream so that we can properly destroy it when the connection ends
  onStreamHandleStreamAndSetState = (stream, myVideoComponent) => {
    this.setState({
      stream: stream
    })
    myVideoComponent.srcObject = stream;
  }

  componentDidMount() {
    const { displayName } = this.props

    const iceServers = { // ** for explanation of ice servers see footnote
       'iceServers': [
         { 'urls': 'stun:stun.l.google.com:19302' },
         { 'urls': 'turn:numb.viagenie.ca', 'credential': 'webrtc', 'username': 'javier3@gmail.com' }
        ] };

    const peer = new Peer({host: 'jampspace-01-peerjs-01.herokuapp.com', port: 443, config: iceServers, secure: true});
    this.setState({peer});
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    let conn = peer.connect(displayName);
    this.setState({conn});

    const myVideoComponent = document.getElementById('myVideo');

    peer.on('call', (call) => this.onCallAnswerCallHandleStreamAndSetState(call, myVideoComponent) );
  }

  async componentWillUnmount(){
    // OB/JD: most of this doesn't need to be on state
    const { conn, call, peer, stream } = this.state;

    // need to figure out if how to properly disconnect and hangup call
    // conn.disconnect() ?
    // call.hangup() ?

    peer.destroy();
    console.log('streamer-vid.js | peer destroyed')
    stream && stream.getTracks().forEach(track => track.stop())
    console.log('streamer-vid.js | tracks stopped')
  }

  render() {
    return (
      <div>
        <video id="myVideo" autoPlay />
      </div>
    );
  }
}

// ** ICE SERERS :
// Ice servers are used by webrtc / peerjs to establish the connection to the browser clients
// when they are behind routers that sheild private networks from the public internet - when
// peerJS makes connection it uses stun server to identify its external IP and then does some
// math on how to get from that IP, through the private network to the users browser - then it
// sends that to the peer its trying to connect to.
// peerJS recommends we setup our own, and we had identified these settings when we were mucking
// with webRTC
