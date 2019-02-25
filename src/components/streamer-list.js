import React from 'react';
import { Link } from 'react-router-dom';
import '../css/streamer-list.css';
import { Checkbox } from 'semantic-ui-react';

const StreamerList = props => {
  const { jammers, live, handleClick } = props
  return (
    <div className="flex column center space-around parent">
      <div className='flex center category-header'>
        { live ?
        <div className='flex'>
          <h1 id='displaying'>Displaying LIVE Jammers</h1>
          <Checkbox id='live-toggle' toggle active={live} defaultChecked onClick={handleClick}/>
        </div>
        :
        <div className='flex'>
          <h1 id='displaying'>Displaying ALL Jammers</h1>
          <Checkbox id='live-toggle' toggle active={live} defaultChecked onClick={handleClick}/>
        </div>
        }
      </div>
      {jammers.length ? <div className="flex streamer-list jammer-list">
        {jammers.map(jammer => {
          return (
            <Link key={jammer} to={`/channels/${jammer.displayName}`} >
              <div className="flex column jammer-div">
                <img className='jammer-photo' src={jammer.imageUrl} alt="" />
                <h4 className='jammer-title'>{jammer.streamTitle ? jammer.streamTitle : `${jammer.displayName} 's   Jam Space`}</h4>
                <div className='below-title-text flex space-between'>
                  <p id='streamer-name' className='stream-detail'>{jammer.displayName}</p>
                  <p className='stream-detail'>{jammer.streamCategory}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div> : <h1>No live jammers. Get a stream going!</h1>}
    </div>
  );
}

export default StreamerList
