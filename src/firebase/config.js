import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCU6QSVm3sRKcYb7Oa72_DRgaEjJkJgve4",
    authDomain: "articledemo-e01d6.firebaseapp.com",
    projectId: "articledemo-e01d6",
    storageBucket: "articledemo-e01d6.firebasestorage.app",
    messagingSenderId: "848354851238",
    appId: "1:848354851238:web:677a23149e2b6b0feb3767",
    measurementId: "G-GG8EP1NFWT"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore();
 
  // Initialize Analytics (optional, only if you need it)
  const analytics = getAnalytics(app);


  export {db, app, analytics}