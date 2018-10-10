import Peer from 'peerjs';
import React, { Component } from 'react';
import '../css/streamer-vid.css'
import { getStreamer } from '../utils';
import db from '../firebase';

export default class StreamerVid extends Component {
  constructor(){
    super()
    this.state = {
      peer: '',
      conn: null,
      stream: null
    }
  }

  // This func is bound to state so that it can be used to store the peer.connection
  // on state when a viewer connects to the streamer. We want to store the
  // connection so that we can properly destroy it when the connection ends
  onConnectionCallPeerAndSendStream = (conn) => {
    this.setState({conn})
    this.state.peer.call(conn.peer, this.state.stream)
  }

  async componentDidMount() {
    const { displayName } = this.props
    let streamerPeerId = displayName;

    const iceServers = { // for explanation of iceServers see footnote in viewer-vid.js
      'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' },
        { 'urls': 'turn:numb.viagenie.ca', 'credential': 'webrtc', 'username': 'javier3@gmail.com' }
       ] };

    const peer = new Peer(streamerPeerId, {host: 'jampspace-01-peerjs-01.herokuapp.com', port: 443, config: iceServers, secure: true});
    this.setState({peer});
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    const myVideo = document.getElementById('myVideo');

    await this.setState({
      stream: await navigator.mediaDevices.getUserMedia({ video: true, audio: true})
    })
    myVideo.srcObject = this.state.stream

    peer.on('connection', (conn) => this.onConnectionCallPeerAndSendStream(conn))

    const streamer = await getStreamer(displayName);
    const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
    await streamerRef.update({...streamer, isStreaming: true})
  }

  async componentWillUnmount(){
    const { peer, stream } = this.state;  //conn?
    const { displayName } = this.props
    const streamer = await getStreamer(displayName);
    const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
    await streamerRef.update({...streamer, isStreaming: false})

    // need to figure out if how to properly disconnect connections
    // is peer.destroy sufficient? what if multiple connections?
    // conn.disconnect() ?
    peer.destroy();
    console.log('streamer-vid.js | peer destroyed')
    stream.getTracks().forEach(track => track.stop())
    console.log('streamer-vid.js | tracks stopped')
  }

  render() {

    return (
      <div>
        <video id="myVideo" autoPlay muted/>
      </div>
    );
  }
}
