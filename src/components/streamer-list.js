import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/streamer-list.css';
import { Button } from 'semantic-ui-react';
import { getAllJammers, getLiveJammers } from '../utils';

export default class StreamerList extends Component{
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

  render(){
    const { jammers, live } = this.state
    console.log('JAMMER CHECK: ', jammers)
    return (
      <div className="flex column center space-around">
        <div className='flex center category-header'>
          <div className='flex space-between'>
            <h1 id='header-text'>Displaying: </h1>
             { live ?
             <Button id='live-channels-btn' toggle active={this.state.live} onClick={this.handleClick}>
              Live Channels
             </Button> :
             <Button id='all-channels-btn' toggle active={this.state.live} onClick={this.handleClick}>
             All Channels
            </Button>
            }
          </div>
        </div>

        {jammers.length ? <div className="flex streamer-list jammer-list">
          {jammers.map(jammer => {
            return (
              <Link to={`/channels/${jammer.displayName}`} >
                <div className="flex column jammer-div">
                  <img className='jammer-photo' src={jammer.imageUrl} alt="" />
                  <h4 className='jammer-title'>{jammer.streamTitle}</h4>
                  <div className='below-title-text flex space-between'>
                    <p className='stream-detail'>{jammer.displayName}</p>
                    <p className='stream-detail'>{jammer.streamCategory}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>: <h1>No live jammers :(</h1>}
      </div>
    );
  }

}

