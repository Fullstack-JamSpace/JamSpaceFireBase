import * as firebase from 'firebase';
import db from './firebase';

export const getCurrentUser = async () => {
  try {
    const currentJammer = firebase.auth().currentUser;
    if (currentJammer) {
      const currentJammerObject = await db.collection('jammers').doc(currentJammer.email).get();
      const currentJammerData = currentJammerObject.data();
      // console.log('utils.js | currentJammerData', currentJammerData);
      return currentJammerData;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return {};
  }
};
