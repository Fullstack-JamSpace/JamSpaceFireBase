import React from 'react';
import {Link} from 'react-router-dom';

export const PageNotFound = () => (
  <div>
    <h1 >404</h1>
    <h5>It seems you got lost...</h5>
    <div><Link to="/">Return Home</Link></div>
  </div>
)
