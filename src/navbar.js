import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="header App-header">
    <h3>JamSpace Baby</h3>
    <nav>
      <Link to="/signup">Sign Up</Link> <br></br>
      <Link to="/login">Login</Link><br></br>
      <Link to="/streamer">Streamer</Link><br></br>
      <Link to="/viewer">Viewer</Link><br></br>
    </nav>
  </div>
);

export default Navbar
