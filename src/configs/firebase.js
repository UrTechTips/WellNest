import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const apiKey = process.env.NEXT_PUBLIC_FIREBASE_apiKey;
// const authDomain = process.env.NEXT_PUBLIC_FIREBASE_authDomain;
// const projectId = process.env.NEXT_PUBLIC_FIREBASE_projectId;
// const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_storageBucket;
// const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId;
// const appId = process.env.NEXT_PUBLIC_FIREBASE_appId;

// console.log(apiKey);

const firebaseConfig = {
	apiKey: "AIzaSyA_pvVp7hstoCPiX7YzoQlsZirMUFyf9xM",
	authDomain: "wellnest-b5ba3.firebaseapp.com",
	projectId: "wellnest-b5ba3",
	storageBucket: "wellnest-b5ba3.firebasestorage.app",
	messagingSenderId: "250599569566",
	appId: "1:250599569566:web:875e7a24a87053b45ba38f",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export { app, auth, firestore };
