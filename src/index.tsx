import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./thanhStyle.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ80jTkVG1QUklwL0vIux3uo301XSayo8",
  authDomain: "sl-base-project.firebaseapp.com",
  projectId: "sl-base-project",
  storageBucket: "sl-base-project.appspot.com",
  messagingSenderId: "872944027651",
  appId: "1:872944027651:web:9b35492359fd5af3b26636",
  measurementId: "G-V8DF945XMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
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
