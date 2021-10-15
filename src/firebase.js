import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD1lhT19tL7A9Bk4zTJiKdy_vhFYU2hU7A",
  authDomain: "fir-blog-2.firebaseapp.com",
  projectId: "fir-blog-2",
  storageBucket: "fir-blog-2.appspot.com",
  messagingSenderId: "2817187611",
  appId: "1:2817187611:web:648aa924d8538d8f277dbe",
});

const firestore = app.firestore();
export const database = {
  users: firestore.collection("users"),
  avatars: firestore.collection("avatars"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
