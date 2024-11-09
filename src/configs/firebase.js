import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA_pvVp7hstoCPiX7YzoQlsZirMUFyf9xM",
	authDomain: "wellnest-b5ba3.firebaseapp.com",
	projectId: "wellnest-b5ba3",
	storageBucket: "wellnest-b5ba3.firebasestorage.app",
	messagingSenderId: "250599569566",
	appId: "1:250599569566:web:f249642954a3050b5ba38f",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export { app, auth, firestore };
