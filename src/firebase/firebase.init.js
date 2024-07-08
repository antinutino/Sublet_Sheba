// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYRvjBItjnqKsjfyFyxT9r_w1jfbVugE",
  authDomain: "sublet-sheba-ss.firebaseapp.com",
  projectId: "sublet-sheba-ss",
  storageBucket: "sublet-sheba-ss.appspot.com",
  messagingSenderId: "965089657373",
  appId: "1:965089657373:web:60d37572c3159fb8befcf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
export default auth;