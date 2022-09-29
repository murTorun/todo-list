// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    arrayRemove,
    arrayUnion,
    doc,
    FieldValue,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
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
const db = getFirestore(app);

let uidIndex = document.cookie.indexOf("uid");
let foundValue = false;
let uid = "";
if (uidIndex != -1) {
    for (let i = uidIndex; i < 200; i++) {
        if (foundValue) {
            if (document.cookie[i] === undefined || document.cookie[i] === ";")
                break;
            uid += document.cookie[i];
        } else if (document.cookie[i] == "=") foundValue = true;
    }
}
if (uid === "") {
    document.querySelector(".not-logged-in-text").style.display = "block";
    document.querySelector(".not-registered-text").style.display = "block";
    document.querySelector(".sign-out").style.display = "none";
    console.log("empty");
} else {
    document.querySelector(".not-logged-in-text").style.display = "none";
    document.querySelector(".not-registered-text").style.display = "none";
    document.querySelector(".sign-out").style.display = "block";

    console.log("non-empty");
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let todoTexts;
    if (docSnap.exists()) {
        todoTexts = docSnap.data()["todo-texts"];
        todoTexts.forEach((element) => {
            let newToDoItem = document.createElement("div");
            newToDoItem.classList.add("todo-item");
            newToDoItem.innerHTML = `
                    <div class="todo-text">${element}
                    </div>
                    <div class="trash-icon">
                        <img src="./svg/trash-bin.svg" alt="trash bin icon" />
                    </div>`;

            const toDoItemsContainer = document.querySelector(
                ".todo-items-container"
            );
            console.log(element);
            toDoItemsContainer.appendChild(newToDoItem);
        });
    } else {
        await setDoc(doc(db, "users", uid), {
            "todo-texts": [],
        });
    }
}
console.log(uid);
document.querySelector(".sign-out").addEventListener("click", () => {
    let date = new Date();
    let days = 120;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `uid=;expires=${date.toUTCString()};path=/`;
    document.querySelector(".not-logged-in-text").style.display = "block";
    document.querySelector(".not-registered-text").style.display = "block";
    document.querySelector(".sign-out").style.display = "none";
    uid = "";
    console.log("hi");
    location.reload();
});

document
    .querySelector(".add-item-menu")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const docRef = doc(db, "users", uid);

        const input = e.target["text-input"].value;
        if (input == "") return;
        e.target["text-input"].value = "";
        /* await setDoc(doc(db, "users", uid), {
            "todo-texts": FieldValue.arrayUnion(input),
        }); */
        let newToDoItem = document.createElement("div");
        newToDoItem.classList.add("todo-item");
        newToDoItem.innerHTML = `
                    <div class="todo-text">${input}
                    </div>
                    <div class="trash-icon">
                        <img src="./svg/trash-bin.svg" alt="trash bin icon" />
                    </div>`;
        const toDoItemsContainer = document.querySelector(
            ".todo-items-container"
        );
        newToDoItem.lastChild.addEventListener("click", async (e) => {
            const docRef = doc(db, "users", uid);
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove();
            await updateDoc(docRef, {
                "todo-texts": arrayRemove(
                    e.target.parentElement.parentElement.firstElementChild.textContent.trim()
                ),
            });
        });
        toDoItemsContainer.appendChild(newToDoItem);
        await updateDoc(docRef, {
            "todo-texts": arrayUnion(input),
        });
    });

const trashIcon = document.querySelectorAll(".trash-icon");
trashIcon.forEach((e) => {
    e.addEventListener("click", async (e) => {
        const docRef = doc(db, "users", uid);
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
        await updateDoc(docRef, {
            "todo-texts": arrayRemove(
                e.target.parentElement.parentElement.firstElementChild.textContent.trim()
            ),
        });
    });
});
