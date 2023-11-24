// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
//
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLn8jC935p44RA8AI4GlIJI9RPEXxiHnk",
  authDomain: "murointeractivo-a0147.firebaseapp.com",
  projectId: "murointeractivo-a0147",
  storageBucket: "murointeractivo-a0147.appspot.com",
  credential: admin.credential.cert(serviceAccount),
  messagingSenderId: "946191989393",
  appId: "1:946191989393:web:2ca3e51448fe52ef035d30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authentication
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);

module.exports = {
  auth: auth,
  database: db,
  collection: collection,
  addDoc: addDoc,
  getDocs: getDocs,
  app: app,
  query: query,
  where: where,
};
