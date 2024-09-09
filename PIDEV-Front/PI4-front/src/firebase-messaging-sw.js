importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDc6WdOwk-i9hJmN_JpUGPDaORbRxWmamU",
  authDomain: "push-notification-f2e9a.firebaseapp.com",
  projectId: "push-notification-f2e9a",
  storageBucket: "push-notification-f2e9a.appspot.com",
  messagingSenderId: "686325266562",
  appId: "1:686325266562:web:1d5a36993a18ad10a8dc9b",
  measurementId: "G-RR2BFD551E"
 // vapidKey: "BFdPNCSFGsA8LKCmeDHYCVAgDEftLvg568Gd1IkvES1X5cyqK4C_MjPVN2m-85WE-KOpcIQ-14NMjR83qPyZecQ"
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();