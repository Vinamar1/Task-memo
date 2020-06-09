import firebase from 'firebase'


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

let fire = firebase.initializeApp(firebaseConfig);

// var database = firebase.database();
// var ref = database.ref('users');

// var data = {
//     name: 'DTS',
//     score: 43
// }
// ref.push(data);

export default fire;
