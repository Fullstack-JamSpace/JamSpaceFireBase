import React from 'react';
import * as firebase from 'firebase';
import db from '../firebase';
import '../css/follow-button.css';
import { Button } from 'semantic-ui-react';

export const FollowButton = (props) => {

  const user = props.user;
  const following = user.following;

  const streamer = props.streamer;
  let followers = streamer.followers || 0;

  let isFollowing = following && following.includes(streamer.displayName);

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
