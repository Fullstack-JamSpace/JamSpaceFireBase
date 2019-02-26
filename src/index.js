import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import { Switch, Route } from 'react-router-dom';
import ScrollToTop from './scroll-to-top'

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
