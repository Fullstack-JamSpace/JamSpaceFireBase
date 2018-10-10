import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignUp, Login, StreamerVid, ViewerVid, AccountInfo, PageNotFound, Home, Channels, About, StreamNav, SingleCategory, AllCategories } from './components';

export default class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/channels/old" component={Channels} />
        <Route exact path="/channels" component={AllCategories} />
        <Route exact path="/channels/:displayName/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName" component={StreamNavWithUser} />
        <Route exact path="/categories/:category" component={SingleCategory} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
