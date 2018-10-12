import React from 'react';
import db from '../firebase';
import { getCurrentUser, getStreamer } from '../utils'
import { getAllJammers, getLiveJammers } from '../utils';

export const withJammers = (WrappedComponent) => {
  return class extends React.Component {
    constructor(){
      super();
      this.state = {
        live: true,
        jammers: []
      }
    }

    async componentDidMount(){
      const jammers = this.state.live ? await getLiveJammers() : await getAllJammers();
      await this.setState({ jammers });
    }

    handleClick = async () => {
      const { live } = this.state
      await this.setState({ live: !live })
      const jammers = this.state.live ? await getLiveJammers() : await getAllJammers();
      await this.setState({ jammers });
    }

    render() {
      const { jammers, live } = this.state
      return !jammers
      ? <div>...loading</div>
      : <WrappedComponent jammers={jammers} live={live} handleClick={this.handleClick} {...this.props} />
    }
  }
}
