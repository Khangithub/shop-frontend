import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAWX6LlQ04dhdVEiCfBbCF51C5FvJscY3c',
  authDomain: 'fir-fb-auth.firebaseapp.com',
  databaseURL: 'https://fir-fb-auth.firebaseio.com',
  projectId: 'fir-fb-auth',
  storageBucket: 'fir-fb-auth.appspot.com',
  messagingSenderId: '564334295594',
  appId: '1:564334295594:web:71a044e4fe88c339f22153',
  measurementId: 'G-18STBMDVJ0',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}

const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {storage, auth, provider, firebase as default};
