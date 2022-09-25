// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXcg-giCnI2JJsnZpEWSe1hnOAMpFk6M4",
    authDomain: "todo-list-a8376.firebaseapp.com",
    projectId: "todo-list-a8376",
    storageBucket: "todo-list-a8376.appspot.com",
    messagingSenderId: "340789455704",
    appId: "1:340789455704:web:9bdd88437a4cc917eb132d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const form = document.querySelector("form");
const googleButton = document.querySelector(".google-btn");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hi");
    signInWithEmailAndPassword(
        auth,
        e.target["email"].value,
        e.target["password"].value
    )
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("successfully logged in");
            window.location.href = "../../index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const errDisplay = document.querySelector(".error-message");
            errDisplay.textContent = "Invalid email and/or password";
        });
});

googleButton.addEventListener("click", (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            let date = new Date();
            let days = 120;
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = `uid=${
                user.uid
            };expires=${date.toUTCString()};path=/`;
            // ...
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});
