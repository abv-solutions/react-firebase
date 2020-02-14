import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Firebase app config
const config = {
  apiKey: 'AIzaSyAPZS0c9KHwttgJcdCrRnsDN80pHFkFaO4',
  authDomain: 'react-abv-solutions.firebaseapp.com',
  databaseURL: 'https://react-abv-solutions.firebaseio.com',
  projectId: 'react-abv-solutions',
  storageBucket: 'react-abv-solutions.appspot.com',
  messagingSenderId: '75388490556',
  appId: '1:75388490556:web:c432bd94a343a492dc8439',
  measurementId: 'G-MX3990LQ2F'
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
