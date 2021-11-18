import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAxvjBnfzGD8zKDXhNzDNL1VYI5ZrrU3IY",
  authDomain: "valafilms-e47d1.firebaseapp.com",
  projectId: "valafilms-e47d1",
  storageBucket: "valafilms-e47d1.appspot.com",
  messagingSenderId: "428292675315",
  appId: "1:428292675315:web:7d0e9038958b19c1b8c986"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href="/admin"
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export const auth = firebase.auth();
export const logout = () => {
  auth.signOut();
};
export default firebase;
