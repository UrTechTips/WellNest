"use client";
import AddActivityComp from "@/components/addActivity.component";
import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/configs/firebase";
import { UserContext } from "../layout";

const Page = () => {
	const dayNum = new Date().getDay();
	let day;
	switch (dayNum) {
		case 0:
			day = "Sunday";
			break;
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
			day = "Unknown";
			break;
	}

	const user = useContext(UserContext).user;
	const db = getFirestore();
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
	const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(true);
	const [weather, setWeather] = useState(null);
	const [mood, setMood] = useState(2);
	const [activities, setActivities] = useState([]);
	const [wellnessTip, setWellnessTip] = useState("");
	const [addActivityOpen, setAddActivityOpen] = useState(false);
	const [allActivities, SetallActivities] = useState({});
	const [allMoods, setAllMoods] = useState({});

	useEffect(() => {
		const fetchWeather = async () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					console.log(position.coords);
					try {
						const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`);
						if (!weatherResponse.ok) {
							throw new Error(`Weather fetch failed: ${weatherResponse.statusText}`);
						}
						const weatherData = await weatherResponse.json();
						const { temp, humidity } = weatherData.main;
						const weatherDescription = weatherData.weather[0].description;
						const cityName = weatherData.name;

						setWeather(weatherData);

						try {
							const tipResponse = await fetch(`http://127.0.0.1:8080/getTip`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									temp: temp,
									humidity: humidity,
									weatherDescription: weatherDescription,
									cityName: cityName,
								}),
							});
							if (!tipResponse.ok) {
								throw new Error(`Tip fetch failed: ${tipResponse.statusText}`);
							}
							const tipData = await tipResponse.json();
							console.log(tipData.message);
							setWellnessTip(tipData.message);
						} catch (tipError) {
							console.error("Error fetching wellness tip:", tipError);
						}
					} catch (weatherError) {
						console.error("Error fetching weather data:", weatherError);
					}
				});
			}
		};

		fetchWeather();
	}, [apiKey]);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				if (user) {
					const userDoc = doc(db, "users", user.uid);
					const userSnapshot = await getDoc(userDoc);
					if (!userSnapshot.exists()) {
						alert("Error");
						return;
					}
					const activitiesData = userSnapshot.data().activites;
					SetallActivities(activitiesData);
					const moodsData = userSnapshot.data().moods;
					setAllMoods(moodsData);
					if (activitiesData && activitiesData[day.toLowerCase()]) {
						setActivities(activitiesData[day.toLowerCase()]);
					} else {
						console.error(`No activities found for ${day.toLowerCase()}`);
						setActivities([]);
					}
					if (moodsData && moodsData[day.toLowerCase()]) {
						console.log(moodsData);
						setMood(getMoodNumberFromName(moodsData[day.toLowerCase()]));
					} else {
						console.error(`No Moods found for ${day.toLowerCase()}`);
						setActivities([]);
					}
				}
			} catch (error) {}
		};
		fetchActivities();
	}, [user]);

	const handleAddActivity = (name) => {
		setActivities([...activities, name]);
	};

	const handleSaveActivities = async () => {
		try {
			await updateDoc(doc(db, "users", user.uid), {
				activites: {
					...allActivities,
					[day.toLowerCase()]: activities,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const moodOptions = [
		{ emoji: "😡", label: "Angry" },
		{ emoji: "😠", label: "Irritated" },
		{ emoji: "😢", label: "Sad" },
		{ emoji: "🙂", label: "Okay" },
		{ emoji: "😊", label: "Happy" },
	];
	const getMoodNumberFromName = (moodName) => {
		console.log(moodName);
		return moodOptions.findIndex((mood) => mood.label === moodName);
	};

	const handleMoodChange = (e) => {
		setMood(parseInt(e.target.value, 10));
	};

	const handleSaveMood = async () => {
		try {
			await updateDoc(doc(db, "users", user.uid), {
				moods: {
					...allMoods,
					[day.toLowerCase()]: moodOptions[mood].label,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Dialog open={addActivityOpen} onClose={setAddActivityOpen} className="relative z-10">
				<AddActivityComp setState={setAddActivityOpen} addActivity={handleAddActivity} />
			</Dialog>
			<div className="bg-dark text-gray-100">
				{/* Main Content */}
				<div className="relative isolate px-6 pt-14 lg:px-8">
					<div className="px-6 py-8 mx-auto max-w-7xl">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Mood Section */}
							<div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 relative flex flex-col">
								<h2 className="text-2xl font-semibold">Mood of the Day</h2>
								<div className="mt-4 text-center relative flex-grow">
									{/* Emoji for Mood */}
									<span className="text-4xl">{moodOptions[mood].emoji}</span>
									<p className="mt-2">{moodOptions[mood].label}</p>

									<div className="relative mb-6 mt-3">
										<input id="labels-range-input" type="range" value={mood} min="0" max="4" onChange={handleMoodChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
										<span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Angry</span>
										<span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">Irritated</span>
										<span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">Sad</span>
										<span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">Okay</span>
										<span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Happy</span>
									</div>
								</div>
								<button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition-all max-w-32 self-end" onClick={handleSaveMood}>
									Save Mood
								</button>
							</div>

							{/* Activities Section */}
							<div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 relative">
								<div className="flex justify-between items-center">
									<h2 className="text-2xl font-semibold">Today&#39;s Activities</h2>
									<PlusIcon aria-hidden="true" className="h-9 w-9 text-white cursor-pointer hover:bg-gray-600 transition-all rounded-full px-1 py-1" onClick={() => setAddActivityOpen(true)} />
								</div>
								<ul className="mt-4 space-y-2">
									{activities.map((activity, index) => (
										<li key={index} className="list-inside list-decimal">
											<span>{activity}</span>
										</li>
									))}
								</ul>
								<button className="absolute bottom-4 right-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition-all" onClick={handleSaveActivities}>
									Save Activities
								</button>
							</div>

							{/* Weather Section */}
							<div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
								<h2 className="text-2xl font-semibold">Today&apos;s Weather</h2>
								<div className="mt-4">
									{weather ? (
										<>
											<div className="flex flex-col gap-2">
												<span>Location: {weather.name}</span>
												<span>Temperature: {Math.round((weather.main.temp - 273.15 + Number.EPSILON) * 100) / 100}°C</span>
												<span>Feels Like: {Math.round((weather.main.feels_like - 273.15 + Number.EPSILON) * 100) / 100}°C</span>
												<span>Humidity: {weather.main.humidity}%</span>
												<span>Condition: {weather.weather[0].main}</span>
											</div>
										</>
									) : (
										<p>Loading weather data...</p>
									)}
								</div>
							</div>

							{/* AI Wellness Tips Section */}
							<div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 col-span-3 row-start-2">
								<h2 className="text-2xl font-semibold">AI Wellness Tip</h2>
								{wellnessTip ? (
									<>
										<p className="mt-4 text-lg">{wellnessTip.summary}</p>
										<h4 className="mt-2 text-xl font-bold">Clothing:</h4>
										<p className="mt-1 text-lg">{wellnessTip.properties.clothing}</p>
										<h4 className="mt-2 text-xl font-bold">Food: </h4>
										<p className="mt-1 text-lg">{wellnessTip.properties.food}</p>
										<h4 className="mt-2 text-xl font-bold">Others: </h4>
										<p className="mt-1 text-lg">{wellnessTip.properties.others}</p>
									</>
								) : (
									<p className="mt-4 text-lg">No Daily Tip at the moment.</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Cookie Banner */}
				{isCookieBannerVisible && (
					<section className={"fixed flex items-center justify-between max-w-4xl p-4 mx-auto border shadow-md left-12 bottom-16 rounded-2xl bg-gray-800 text-gray-100 border-gray-700"}>
						<p className="text-sm">By continuing to use this site, you consent to the use of cookies in accordance with our cookie policy.</p>
						<button className="flex items-center justify-center transition-colors duration-300 rounded-full w-7 h-7 focus:outline-none hover:bg-gray-200" onClick={() => setIsCookieBannerVisible(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>
						</button>
					</section>
				)}
			</div>
		</>
	);
};

export default Page;
