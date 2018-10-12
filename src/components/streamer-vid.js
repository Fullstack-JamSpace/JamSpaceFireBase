import Peer from 'peerjs';
import React, { Component } from 'react';
import '../css/streamer-vid.css';
import { getStreamer } from '../utils';
import * as firebase from 'firebase';
import db from '../firebase';

export default class StreamerVid extends Component {
  constructor(props) {
    super(props);
    this.videoElement = React.createRef();
  }

  // Function to send heartbeats to peerjs server to keep connection open.
  // Takes the peer instance as argument and will make peer start sending
  // heartbeats. To stop them later use makePeerHeartbeater.stop()
  // Heroku kills connections with no data transfer after 55 seconds, so
  // the HB interval is set to 50s.

  makePeerHeartbeater(peer) {
    let timeoutId = 0;
    function heartbeat() {
      timeoutId = setTimeout(heartbeat, 50000);
      if (peer.socket._wsOpen()) {
        peer.socket.send({ type: 'HEARTBEAT' });
      }
    }
    // Start
    heartbeat();
    // return
    return {
      start: function() {
        if (timeoutId === 0) {
          heartbeat();
        }
      },
      stop: function() {
        clearTimeout(timeoutId);
        timeoutId = 0;
      }
    };
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
      secure: true,
      debug: 0
    });

    console.log('peer created', this.peer);

    this.peer.on('open', id => {
      console.log('my streamer id is ', id);
    });

    this.heartbeat = this.makePeerHeartbeater(this.peer);

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    this.videoElement.current.srcObject = this.stream;

    this.peer.on('connection', conn => {
      console.log(
        'streamer-vid.js | streamer received connection, connecting id:',
        conn.peer
      );
      this.peer.call(conn.peer, this.stream);
    });

    this.peer.on('close', async () => {
      const currentUser = firebase.auth().currentUser;
      const streamerRef = await db.collection('jammers').doc(currentUser.email);
      await streamerRef.update({
        messages: [],
        isStreaming: false
      });
    });

    const streamer = await getStreamer(displayName);
    const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
    await streamerRef.update({ ...streamer, isStreaming: true });
  }

  async componentWillUnmount() {
    const { displayName } = this.props;
    this.heartbeat.stop()
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
