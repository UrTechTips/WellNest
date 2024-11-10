import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_apiKey;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_authDomain;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_projectId;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_storageBucket;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId;
const appId = process.env.NEXT_PUBLIC_FIREBASE_appId;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export { app, auth, firestore };
