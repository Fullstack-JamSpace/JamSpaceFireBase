import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import '../css/streamer-list.css';

export default class AllCategories extends Component {
  constructor() {
    super();
    this.state = {
      jammers: [],
    };
  }

  fetchJammers = async () => {
    // OB/JD: probably want to do `.onSnapshot` so that this component will update if a new jammer shows up or changes status
    const tempList = await db
      .collection('jammers')
      .where('isStreaming', '==', true)
      .get();
    await tempList.forEach(el => {
      this.setState({ jammers: [...this.state.jammers, el.data()] });
    });
  };

  async componentDidMount() {
    await this.fetchJammers();
  }

  render() {
    const allJammers = this.state.jammers;

    return (
      <div className="flex column center space-around">
        <div className='flex center category-header'>
          <h1 id='header-text'>Live Jammers</h1>
        </div>
        <div className="flex streamer-list jammer-list">
          {allJammers.map(jammer => {
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
        </div>
      </div>
    );
  }
}
