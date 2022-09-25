// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

let uidIndex = document.cookie.indexOf("uid");
let foundValue = false;
let uid = "";
if (uidIndex != -1) {
    for (let i = uidIndex; i < 200; i++) {
        if (foundValue) {
            if (document.cookie[i] === undefined) break;
            uid += document.cookie[i];
        } else if (document.cookie[i] == "=") foundValue = true;
    }
}
document.querySelector(".sign-out").addEventListener("click", () => {
    let date = new Date();
    let days = 120;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `uid=;expires=${date.toUTCString()};path=/`;
    uid = "";
});
