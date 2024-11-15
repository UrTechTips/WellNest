import { UserContext } from "@/app/layout";
import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Navbar = () => {
	const isLoggedIn = useContext(UserContext).isLoggedIn;
	const router = useRouter();
	const handleClick = async () => {
		if (isLoggedIn) {
			try {
				await signOut(auth);
				router.push("/");
			} catch (error) {
				console.log(error);
			}
		} else {
			router.push("/login");
		}
	};
	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5 flex items-center">
						<span className="sr-only">WellNest</span>
						<span className="text-lg font-bold text-indigo-600">WellNest Dashboard</span>
					</Link>
				</div>

				<div className=" lg:flex lg:flex-1 lg:justify-end cursor-pointer" onClick={handleClick}>
					<a className="font-semibold ">
						{isLoggedIn ? "Logout" : "Login"} <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
