import React from 'react';
import { Link } from 'react-router-dom';
import '../css/streamer-list.css';
import { Button } from 'semantic-ui-react';
import { categoryTranslator } from '../utils';

const StreamerListCategory = props => {
  const { jammers, live, handleClick } = props
  const category = categoryTranslator(props.match.params.category);
  const jammerList = category ? jammers.filter(jammer => jammer.streamCategory === category) : jammers
  return (
    <div className="flex column center space-around parent">
      <div className='flex center category-header'>
        <div className='flex space-between'>
          <h1 id='header-text'>Displaying: </h1>
           { live ?
           <Button id='live-channels-btn' toggle active={live} onClick={handleClick}>
            Live Channels
           </Button> :
           <Button id='all-channels-btn' toggle active={live} onClick={handleClick}>
           All Channels
          </Button>
          }
        </div>
      </div>
      {jammerList.length ? <div className="flex streamer-list jammer-list">
        {jammerList.map(jammer => {
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
      </div> : <h1>No live jammers :(</h1>}
    </div>
  )
}

export default StreamerListCategory
