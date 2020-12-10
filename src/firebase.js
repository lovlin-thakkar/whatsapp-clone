import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDViJWUjcT4cgbQS3rQNnIhdfQ3xRQNIq4",
  authDomain: "whatsapp-clone-15113.firebaseapp.com",
  projectId: "whatsapp-clone-15113",
  storageBucket: "whatsapp-clone-15113.appspot.com",
  messagingSenderId: "573799001684",
  appId: "1:573799001684:web:ca547ff8f019eac39c47c1",
  measurementId: "G-TT0J38D004",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
