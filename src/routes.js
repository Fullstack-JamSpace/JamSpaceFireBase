import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {
  SignUp,
  Login,
  Streamer,
  Viewer,
} from './components'

export default class Routes extends Component {
  // OB: dead code
  componentDidMount() {
      //auth stuff?
  }

  render() {

    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/streamer" component={Streamer} />
        <Route exact path="/viewer" component={Viewer} />
      </Switch>
    )
  }
}