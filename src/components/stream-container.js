import React from 'react';
import { StreamNav } from '.';
import '../css/stream-nav.css';
//import { withOnSnapshot } from './with-on-snapshot';

export const StreamContainer = (props) => {
  const { displayName } = props.match.params
  console.log('for the love of god:', displayName)
  return <StreamNav displayName={displayName} />
}
