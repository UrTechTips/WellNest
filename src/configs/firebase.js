import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_apiKey;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_authDomain;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_projectId;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_storageBucket;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId;
const appId = process.env.NEXT_PUBLIC_FIREBASE_appId;

// console.log(apiKey);

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export { app, auth, firestore };
