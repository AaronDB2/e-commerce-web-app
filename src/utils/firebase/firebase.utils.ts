import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

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

// Object to add type
export type ObjectToAdd = {
  title: string;
};

// Function for generating database collection and documents in firebase data store
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  // Get a reference to a collection from database that matches the collectionKey
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  // Create all the documents. Object needs to have a title field
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// Function for getting categories collection data from firebase data store
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

// Additional information type
export type AdditionalInformation = {
  displayName?: string;
};

// User data type
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

// Function for creating an user document for database from authentication
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("error creating the user", error);
    }
  }

  // return userDocRef (used pre saga)

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Create email and password sign in functionality with Firebase
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password with Firebase
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out user with firebase
export const signOutUser = async () => await signOut(auth);

// Listener that executes when auth state changes.
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// Function that instead of using auth listener from firebase uses a more promise based oproach.
// This is needed for redux-saga so not necessarily the best way to do it.
// It unsubscribes from the event listener and gives back the current user as a promise instead.
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
