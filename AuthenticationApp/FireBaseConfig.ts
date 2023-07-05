import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_ySYrL4XnRtXa4q92hlnP3Cq7Kz0ug7c',
  authDomain: 'fir-auth-c3896.firebaseapp.com',
  projectId: 'fir-auth-c3896',
  storageBucket: 'fir-auth-c3896.appspot.com',
  messagingSenderId: '952387859086',
  appId: '1:952387859086:web:f1310e29efd93d25e10fdf',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
