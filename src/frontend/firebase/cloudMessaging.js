/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

const shopper = firebase.initializeApp(firebaseConfig);

shopper.analytics();
// Retrieve Firebase Messaging object.
const messaging = shopper.messaging();

messaging.usePublicVapidKey(
  'BEwTHzS9lX6jlL0CF8hiAivn6x1xDOxLNI99moRpZ96PBwBF02mh_7oy6ndRUkL0x281MxKNn6-0voK9dPm6BTw'
);

const database = firebase.database();

export { messaging, database };
