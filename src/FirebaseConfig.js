// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseConfig} from './Credentials';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Attempts to log into the app using Firebase Authentication
 * given an email and password
 * @async
 * @param {string} email
 * @param {string} password
 * @return {boolean} Did the login succeed? (true/false)
 */
async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    return false;
  }
};

export {logInWithEmailAndPassword};
