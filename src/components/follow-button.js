import React from 'react';
import * as firebase from 'firebase';
import db from '../firebase';
import '../css/follow-button.css';
import { Button } from 'semantic-ui-react';

// the button shouldn't be rendered by stream-nav if there's no user, so,
// although there are some checks for the user here, they shouldn't be necessary
export const FollowButton = (props) => {
  const user = props.user;
  const following = user ? user.following : null;
  let isFollowing = false;

  const streamer = props.streamer;
  let followers = 0

  if(streamer) {
    isFollowing = following && following.includes(streamer.displayName);
    followers = streamer.followers
  }

  const handleClick = async () => {
    try {
      const userData = await db.collection('jammers')
        .doc(`${user.email}`);

      const streamerData = await db.collection('jammers')
        .doc(`${streamer.email}`);

      if (!isFollowing) {
        await userData.update({
          ...user,
          following: firebase.firestore.FieldValue.arrayUnion(
            `${streamer.displayName}`
          )
        });
        await streamerData.update({
          ...streamer,
          followers: (followers += 1)
        });
      } else {
        await userData.update({
          ...user,
          following: firebase.firestore.FieldValue.arrayRemove(
            `${streamer.displayName}`
          )
        });
        if (followers > 0) {
          await streamerData.update({
            ...streamer,
            followers: (followers -= 1)
          });
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  // need to put the check for if you have a user
  // if no user - don't display a button
  // how does this work with the streamer nav bar - what is dan doing to hide button
  // if you're the streamer

  return !isFollowing ? (
    <Button
      className="follow-button"
      onClick={handleClick}
      icon="user"
      content='Follow'
    />
  ) : (
    <Button
      positive
      className="follow-button"
      onClick={handleClick}
      icon="checkmark"
      content='Following'
    />
  );
};
