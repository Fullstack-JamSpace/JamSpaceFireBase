import React from 'react';
import {Link} from 'react-router-dom';
import bandPic from '../pics/Band.jpg';
import lessonPic from '../pics/privatelessons.png';
import performerPic from '../pics/Performer.jpg';
import productionPic from '../pics/Studio.jpg';
import '../css/home.css'

export const Home = () => (
  <div id='home-div'>
    <div className='container'>
      <Link className='white' to='/categories/single'>
        <img className='home-img' src={performerPic} alt=''/>
        <h1 className='center-text'>Single Performers</h1>
      </Link>
    </div>
    <div className='container'>
      <Link className='white' to='/categories/band'>
        <img className='home-img' src={bandPic} alt=''/>
        <h1 className='center-text'>Bands</h1>
      </Link>
    </div>
    <div className='container'>
      <Link className='white' to='/categories/lessons'>
        <img className='home-img' src={lessonPic} alt=''/>
        <h1 className='center-text'>Lessons</h1>
      </Link>
    </div>
    <div className='container'>
      <Link className='white' to='/categories/production'>
        <img className='home-img' src={productionPic} alt=''/>
        <h1 className='center-text-prod'>In the Studio</h1>
      </Link>
    </div>
  </div>
)
