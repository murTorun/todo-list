// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    getAuth,
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
form.addEventListener("submit", (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
        auth,
        e.target["email"].value,
        e.target["password"].value
    )
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("successfully added a user");
            let date = new Date();
            let days = 120;
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = `uid=${
                user.uid
            };expires=${date.toUTCString()};path=/`;
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const errDisplay = document.querySelector(".error-message");
            errDisplay.textContent = "This email already exists";
        });
});
const googleButton = document.querySelector(".google-btn");
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
