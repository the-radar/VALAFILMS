import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA2m504Ph_Jyf8-JupX9fOHz90biK5Z1CU",
  authDomain: "valafilms-5d3a6.firebaseapp.com",
  databaseURL: "https://valafilms-5d3a6-default-rtdb.firebaseio.com",
  projectId: "valafilms-5d3a6",
  storageBucket: "valafilms-5d3a6.appspot.com",
  messagingSenderId: "338857177426",
  appId: "1:338857177426:web:31018719eb4dae76bf0a8b",
  measurementId: "G-50N0313RW6"
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
