import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyC0hc6oJnkX2_elvMqplFsptz2koBErfi4",
  authDomain: "stop-clock-baace.firebaseapp.com",
  databaseURL: "https://stop-clock-baace.firebaseio.com",
  projectId: "stop-clock-baace",
  storageBucket: "stop-clock-baace.appspot.com",
  messagingSenderId: "1027852969732",
  appId: "1:1027852969732:web:76a200d89cc8498b6d9251",
  measurementId: "G-L1F3NLQQ8E"
};

firebase.initializeApp(firebaseConfig);



// const textEmail = document.getElementById('textEmail');
// const textPassword = document.getElementById('textPassword');
// const btnlogin = document.getElementById('btnlogin');
// const btnSignUp = document.getElementById('btnSignUp');
// btnlogin.addEventListener('click', e => {
//   const email = textEmail.value;
//   const pass = textPassword.value;
//   const auth = firebase.auth();
//   const promise = auth.signInWithEmailAndPassword(email, pass);
//   promise.catch(e => console.log(e.message));
// }) 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
