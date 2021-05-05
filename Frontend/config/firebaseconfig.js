import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCGYV_gX30Ubk9FkWspNCCacmGZv25p2pQ",
    authDomain: "bird-identification-960ce.firebaseapp.com",
    databaseURL: "https://bird-identification-960ce.firebaseio.com",
    projectId: "bird-identification-960ce",
    storageBucket: "bird-identification-960ce.appspot.com",
    messagingSenderId: "874837997797",
    appId: "1:874837997797:web:b6c6521374cfc956d17c0c",
}

let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase