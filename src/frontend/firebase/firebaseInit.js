// This contains the Firebase context and provider
import React, { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/database';
import 'firebase/storage';
import firebaseConfig from './firebaseConfig';

// React Context, for this to be accessible any component later
const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  // firebase.app().delete()
  //   .then(function () {
  //     console.log('App deleted successfully');
  //   })
  //   .catch(function (error) {
  //     console.log('Error deleting app:', error);
  //   })
  //   .finally(() => {
  //     console.log('fin')
  //   })

  // let firebaseServices = {
  //   firebase: null,
  //   databaseRef: null,
  //   storageRef: null,
  //   messaging: null
  // }

  console.log(`App firebase inicio: ${firebase.apps.length}`);

  // check if firebase app has been initialized previously
  // if not, initialize with the config we saved earlier
  // if (!firebase.apps.length) {

  const shopper = firebase.initializeApp(firebaseConfig);

  shopper.analytics();

  // Retrieve Firebase Messaging object.
  const messaging = shopper.messaging();
  messaging.usePublicVapidKey(
    'BEwTHzS9lX6jlL0CF8hiAivn6x1xDOxLNI99moRpZ96PBwBF02mh_7oy6ndRUkL0x281MxKNn6-0voK9dPm6BTw'
  );

  const databaseRef = shopper.database().ref();
  const storageRef = shopper.storage().ref();

  // TODO: Implement onDisconnect() method to do stuff offline

  const firebaseServices = {
    firebase,
    messaging,
    databaseRef,
    storageRef,
  };
  // } else {
  //   const shopper = firebase.app();

  //   shopper.analytics();

  //   // Retrieve Firebase Messaging object.
  //   const messaging = shopper.messaging();
  //   messaging.usePublicVapidKey(
  //     'BEwTHzS9lX6jlL0CF8hiAivn6x1xDOxLNI99moRpZ96PBwBF02mh_7oy6ndRUkL0x281MxKNn6-0voK9dPm6BTw'
  //   );

  //   const databaseRef = shopper.database().ref();
  //   const storageRef = shopper.storage().ref();

  //   // TODO: Implement onDisconnect() method to do stuff offline

  //   firebaseServices = {
  //     firebase, messaging, databaseRef, storageRef
  //   }
  // }

  console.log(`App firebase fin: ${firebase.apps.length}`);

  return (
    <FirebaseContext.Provider value={firebaseServices}>
      {children}
    </FirebaseContext.Provider>
  );
};
