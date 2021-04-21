import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBIC5KLDrqLCFqf1C6SFmJQED7mPrRzozQ',
  authDomain: 'slack-clone-yt-c2218.firebaseapp.com',
  projectId: 'slack-clone-yt-c2218',
  storageBucket: 'slack-clone-yt-c2218.appspot.com',
  messagingSenderId: '570955479255',
  appId: '1:570955479255:web:e42cb2655fcea178a49892'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
