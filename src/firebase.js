import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxXCQzVlct1TLHf-NrBS9Hl5LaiMI8nLc",
    authDomain: "emoji-tactics.firebaseapp.com",
    databaseURL: "https://emoji-tactics.firebaseio.com",
    projectId: "emoji-tactics",
    storageBucket: "emoji-tactics.appspot.com",
    messagingSenderId: "28910358794"
};

const fb = firebase.initializeApp(config);

export default fb;