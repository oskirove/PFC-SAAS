import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//modificar si se cambia de correo electrónco (firestore)

const firebaseConfig = {
    apiKey: "AIzaSyCW5Cz5-h_rlPDGC4mJy9FSJh0pe46lrvw",
    authDomain: "saas-proyecto-final.firebaseapp.com",
    projectId: "saas-proyecto-final",
    storageBucket: "saas-proyecto-final.appspot.com",
    messagingSenderId: "635282509319",
    appId: "1:635282509319:web:b87ac3316062d2d256a4a2"
  };

  const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app);

  export {db, auth, functions};