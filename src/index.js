import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import { DataProvider } from "./context/DataContext";
import { GlobalStateProvider } from "./context/GlobalStateContext";

//Firebase Configuration Below
var config = {
  apiKey: "AIzaSyAvpDPP3ObMeXohV8Fix-YE0Bs8MEISh_o",
  authDomain: "workwiz-2aee8.firebaseapp.com",
  databaseURL: "https://workwiz-2aee8.firebaseio.com",
  projectId: "workwiz-2aee8",
  storageBucket: "workwiz-2aee8.appspot.com",
  messagingSenderId: "4359964425",
  appId: "1:4359964425:web:30f29d38fd4984e3d035d8",
  measurementId: "G-BHWHPMG7LZ"
};

//Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render(
  <DataProvider>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </DataProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
