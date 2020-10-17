import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC9iMAhYnMDDN9q6eHwDKhAm8vnaYLMYv8",
    authDomain: "crwn-db-a83c3.firebaseapp.com",
    databaseURL: "https://crwn-db-a83c3.firebaseio.com",
    projectId: "crwn-db-a83c3",
    storageBucket: "crwn-db-a83c3.appspot.com",
    messagingSenderId: "470930936353",
    appId: "1:470930936353:web:d5ceb2a8473a6735320960",
    measurementId: "G-56HFL16D5W"
 };

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({prompt: 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;