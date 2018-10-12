import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignUp, Login, StreamerVid, ViewerVid, AccountInfo, PageNotFound, Home, Channels,StreamNav, StreamerList, StreamerListCategory } from './components';
import { withOnSnapshot } from './components/with-on-snapshot'

export default class Routes extends Component {

  render() {
    const StreamNavWithOnSnapshot = withOnSnapshot(StreamNav)
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/channels" component={StreamerList} />
        <Route exact path="/channels/:displayName/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName" component={StreamNavWithOnSnapshot} />
        <Route exact path="/categories/:category" component={StreamerListCategory} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
