const firebaseConfig = {
    apiKey: "AIzaSyCXqHCVXklMChqkyyqTbfATb8qmbVaOlWI",
    authDomain: "pg-website-d1767.firebaseapp.com",
    projectId: "pg-website-d1767",
    storageBucket: "pg-website-d1767.appspot.com",
    messagingSenderId: "949244059950",
    appId: "1:949244059950:web:5f1152d7389c8078a61abf"
};

 // Initialize Firebase
 const app = firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 const storage = firebase.storage();

 