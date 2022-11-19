const firebaseConfig = {
  apiKey: "AIzaSyC3lzgRqnktDri5HPYmqM4s_eQGgg8fAYY",
  authDomain: "to-do-list-8def0.firebaseapp.com",
  projectId: "to-do-list-8def0",
  storageBucket: "to-do-list-8def0.appspot.com",
  messagingSenderId: "1010922071356",
  appId: "1:1010922071356:web:2056badfca15fe3f10ea39",
  measurementId: "G-PQD3ZJ56M2",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
