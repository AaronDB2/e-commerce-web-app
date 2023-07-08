import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize firebase database object
export const db = getFirestore();

// Function for creating an user document for database from authentication
export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
