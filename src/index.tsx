import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBSl2BdAd_DghcW5a5-qp8gFcK0nfuGCY",
  authDomain: "controle-de-gastos-3e7f9.firebaseapp.com",
  projectId: "controle-de-gastos-3e7f9",
  storageBucket: "controle-de-gastos-3e7f9.appspot.com",
  messagingSenderId: "1018055774945",
  appId: "1:1018055774945:web:bb0b24d7c0a4992e16dda0"
};
const app = firebase.initializeApp(firebaseConfig);

const auth = firebaseAuth.initializeAuth(app);
firebaseAuth.signInWithEmailAndPassword(
  auth, 'paulorsaf@gmail.com', '123456'
)
.then(user => console.log(user))
.catch(error => console.log('error', error));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
