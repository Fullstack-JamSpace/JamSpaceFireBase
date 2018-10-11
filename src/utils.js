import * as firebase from 'firebase';
import db from './firebase';

export const getCurrentUser = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = await db.collection('jammers').doc(user.email).get();
      const userData = userRef.data();
      return {...userData, id: user.email, uid: user.uid}
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getStreamer = async displayName => {
  let streamer = null
  try {
    const streamerRef = await db.collection('jammers').where('displayName', '==', `${displayName}`).get()
    streamerRef.forEach(doc => streamer = doc.data())
  } catch (error) {
    console.log(error);
  }
  return streamer;
}

export const categoryTranslator = str => {
  switch (str) {
    case 'single':
      return 'Single Performer'
    case 'band':
      return 'Band'
    case 'lessons':
      return 'Lessons'
    default:
      return 'Production'
  }
}

export const getLiveJammers = async () => {
  let jammers = [];
  const tempList = await db
    .collection('jammers')
    .where('isStreaming', '==', true)
    .get();
  await tempList.forEach(el => jammers.push(el.data()))
  return jammers;
};

export const getAllJammers = async () => {
  let jammers = [];
  const tempList = await db.collection('jammers').get();
  await tempList.forEach(el => jammers.push(el.data()))
  return jammers;
};
