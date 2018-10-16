import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignUp, Login, StreamerVid, ViewerVid, AccountInfo, PageNotFound, Home, StreamContainer, StreamerList, StreamerListCategory } from './components';
// import { withOnSnapshot } from './components/with-on-snapshot'
import { withJammers } from './components/with-jammers'

export default class Routes extends Component {

  render() {
    // const StreamNavWithOnSnapshot = withOnSnapshot(StreamNav)
    const StreamerListWithJammers = withJammers(StreamerList)
    const StreamerListCategoryWithJammers = withJammers(StreamerListCategory)
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/channels" component={StreamerListWithJammers} />
        <Route exact path="/channels/:displayName/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName" component={StreamContainer} />
        <Route exact path="/categories/:category" component={StreamerListCategoryWithJammers} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
