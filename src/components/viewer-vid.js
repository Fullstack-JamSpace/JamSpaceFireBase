import Peer from 'peerjs';
import React, { Component } from 'react';

export default class ViewerVid extends Component {
  constructor() {
    super();
    this.videoElement = React.createRef();
  }

  componentDidMount() {
    const { displayName } = this.props;

    const iceServers = {
      // ** for explanation of ice servers see footnote
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'webrtc',
          username: 'javier3@gmail.com'
        }
      ]
    };

    this.peer = new Peer({
      host: 'jampspace-01-peerjs-01.herokuapp.com',
      port: 443,
      config: iceServers,
      secure: true,
      debug: 3
    });

    console.log('peer created', this.peer);

    this.peer.on('open', id => {
      console.log('my viewer id is ', id);
    });

    this.peer.connect(displayName);

    this.peer.on('call', call => {
      call.answer();
      call.on('stream', stream => {
        this.stream = stream;
        this.videoElement.current.srcObject = stream;
      });
    });
  }

  async componentWillUnmount() {
    this.peer.destroy();
    this.stream && this.stream.getTracks().forEach(track => track.stop());
  }

  render() {
    return (
      <div>
        <video id="myVideo" ref={this.videoElement} autoPlay />
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
