import Peer from 'peerjs';
import React, { Component } from 'react';
import '../css/streamer-vid.css';
import { getStreamer } from '../utils';
import db from '../firebase';

export default class StreamerVid extends Component {
  constructor(props) {
    super(props);
    this.videoElement = React.createRef();
  }

  async componentDidMount() {
    const { displayName } = this.props;
    let streamerPeerId = displayName;

    const iceServers = {
      // for explanation of iceServers see footnote in viewer-vid.js
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'webrtc',
          username: 'javier3@gmail.com'
        }
      ]
    };

    this.peer = new Peer(streamerPeerId, {
      host: 'jampspace-01-peerjs-01.herokuapp.com',
      port: 443,
      config: iceServers,
      secure: true
    });

    console.log('peer created', this.peer);

    this.peer.on('open', id => {
      console.log('my streamer id is ', id);
    });

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    this.videoElement.current.srcObject = this.stream;

    this.peer.on('connection', conn => this.peer.call(conn.peer, this.stream));

    const streamer = await getStreamer(displayName);
    const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
    await streamerRef.update({ ...streamer, isStreaming: true });
  }

  async componentWillUnmount() {
    const { displayName } = this.props;
    const streamer = await getStreamer(displayName);
    const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
    await streamerRef.update({ ...streamer, isStreaming: false });

    this.peer.destroy();
    this.stream.getTracks().forEach(track => track.stop());
  }

  render() {
    return (
      <div>
        <video id="myVideo" ref={this.videoElement} autoPlay muted />
      </div>
    );
  }
}
