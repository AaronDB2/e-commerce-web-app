import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAsMO5TRTtDlJQzsvDBB9kRn-_c6uzHdh8",
  authDomain: "crwn-clothing-db-3afca.firebaseapp.com",
  projectId: "crwn-clothing-db-3afca",
  storageBucket: "crwn-clothing-db-3afca.appspot.com",
  messagingSenderId: "884091406916",
  appId: "1:884091406916:web:f6a89497346cdc6bc98a11",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initialize firebase database object
export const db = getFirestore();

// Function for creating an user document for database from authentication
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // Get a reference to an user document in database for given uid
  const userDocRef = doc(db, "users", userAuth.uid);

  // Get the data from database with given reference
  const userSnapshot = await getDoc(userDocRef);

  // Check if user data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Create the user doc
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// Create email and password sign in functionality with Firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password with Firebase
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out user with firebase
export const signOutUser = async () => await signOut(auth);
