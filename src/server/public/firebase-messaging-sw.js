// The core Firebase JS SDK is always required and must be listed first
importScripts('https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyCjkSRF_UcdemEnegLMH9oAiQikA1pJpB0',
  authDomain: 'shopper-bf029.firebaseapp.com',
  databaseURL: 'https://shopper-bf029.firebaseio.com',
  projectId: 'shopper-bf029',
  storageBucket: 'shopper-bf029.appspot.com',
  messagingSenderId: '674624610647',
  appId: '1:674624610647:web:8d8dbc70bda3f8e12e1e12',
  measurementId: 'G-53G3K08JGJ',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const title = 'Shopper';
  const options = {
    body: payload.data.status,
  };
  return self.registration.showNotification(title, options);
});

// self.addEventListener('notificationclick', function(event) {
//   // do what you want
//   // ...
// });
