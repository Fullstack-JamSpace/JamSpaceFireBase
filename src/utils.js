import * as firebase from 'firebase';
import db from './firebase';

export const getCurrentUser = async () => {
    try {
      const currentJammer = firebase.auth().currentUser
      const currentJammerObject = await db.collection('jammers').doc(currentJammer.email).get();
      return currentJammerObject.data();
    } catch (error) {
      console.log(error);
      return {}
    }

}
