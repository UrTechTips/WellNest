"use client";
import localFont from "next/font/local";
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/Navbar.component";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const UserContext = createContext({ isLoggedIn: false, user: null });

export default function RootLayout({ children }) {
	const db = getFirestore();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUser(user);
			} else {
				setIsLoggedIn(false);
				setUser(null);
			}
		});

		return unsubscribe;
	}, []);
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<UserContext.Provider value={{ isLoggedIn, user }}>
					<Navbar />
					{children}
				</UserContext.Provider>
			</body>
		</html>
	);
}
