import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import { SignUp, Login, StreamerVid, ViewerVid, StreamPage, Home, PageNotFound } from './components';
=======
import { SignUp, Login, StreamerVid, ViewerVid, StreamPage, AccountInfo, SemanticTest, PageNotFound } from './components';
>>>>>>> master

export default class Routes extends Component {
  componentDidMount() {
    //auth stuff?
  }

  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/account" component={AccountInfo} />
        <Route exact path="/channels/:displayName" component={StreamPage} />
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
