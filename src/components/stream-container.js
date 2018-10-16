import React from 'react';
import { StreamNav } from '.';
import '../css/stream-nav.css';
import { withOnSnapshot } from './with-on-snapshot';

export const StreamContainer = (props) => {
  const { displayName } = props.match.params
  const StreamNavWithOnSnapshot = withOnSnapshot(StreamNav, displayName);

  return <StreamNavWithOnSnapshot />
}
