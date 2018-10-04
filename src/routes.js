import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignUp, Login, StreamerVid, ViewerVid, StreamPage, SemanticTest, PageNotFound } from './components';

export default class Routes extends Component {
  componentDidMount() {
    //auth stuff?
  }

  render() {
    return (
      <Switch>
        <Route exact path="/semantic" component={SemanticTest} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={StreamerVid} />
        <Route exact path="/viewer" component={ViewerVid} />
        <Route exact path="/channels/:displayName" component={StreamPage} />
        <Route exact path="/" component={SemanticTest} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
