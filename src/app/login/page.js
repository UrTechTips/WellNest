"use client";
import React, { useState } from "react";
import { auth } from "../../configs/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
	const router = useRouter();
	const db = getFirestore();
	const provider = new GoogleAuthProvider();
	const [user, setUser] = useState({});
	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const userDoc = doc(db, "users", user.uid);
			const userSnapshot = await getDoc(userDoc);

			if (!userSnapshot.exists()) {
				await createUserSnapshot(user);
				return;
			}
			router.push("/dashboard");
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
	};

	const createUserSnapshot = async (user) => {
		try {
			const userDoc = doc(db, "users", user.uid);
			await setDoc(userDoc, {
				moods: {
					monday: "",
					tuesday: "",
					wednesday: "",
					thursday: "",
					friday: "",
					saturday: "",
					sunday: "",
				},
				activites: {
					monday: [],
					tuesday: [],
					wednesday: [],
					thursday: [],
					friday: [],
					saturday: [],
					sunday: [],
				},
			});
			router.push("/dashboard");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="bg-dark text-gray-100">
			<div className="flex items-center justify-center min-h-screen bg-dark">
				<div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 max-w-md w-full">
					<h1 className="text-2xl font-bold text-white text-center mb-6">Login</h1>
					<button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full border border-gray-700 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
						<img
							src="https://pngimg.com/d/google_PNG19635.png" // Path to your Google logo PNG
							alt="Google Logo"
							className="w-5 h-5 mr-2"
						/>
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
