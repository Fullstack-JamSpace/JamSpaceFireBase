import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { categoryTranslator } from '../utils';
import db from '../firebase';
import '../css/streamer-list.css';

export default class SingleCategory extends Component {
  constructor() {
    super();
    this.state = {
      jammers: [],
      // jammerPlaceholder: [
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   },
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   },
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   },
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   },
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   },
      //   {
      //     displayName: 'elmo',
      //     email: 'Elmo@emo.com',
      //     firstName: 'Elmo',
      //     followers: 2,
      //     imageUrl: 'http://www.fillmurray.com/155/155',
      //     lastName: 'Sesame',
      //     streamCategory: 'Single Performer',
      //     streamTitle: "This is elmo's super sick stream"
      //   }
      // ]
    };
  }

  // fetchJammers gets the full list of streamers (jammers!) in the firebase
  // database and returns an array of jammer objects, and tags those objects
  // with the id
  fetchJammers = async () => {
    const preCategory = this.props.match.params.category;
    const category = categoryTranslator(preCategory);
    const tempList = await db
      .collection('jammers')
      .where('streamCategory', '==', `${category}`)
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
    const liveJammers = allJammers.filter(jammer => jammer.isStreaming);

    return (
      <div className="flex column center space-around">
        <div className='flex center category-header'>
          <h1 id='header-text'>Live Jammers</h1>
        </div>
        <div className="flex streamer-list jammer-list">
          {liveJammers.map(jammer => {
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
