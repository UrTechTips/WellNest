export default function Page() {
	return (
		<div className="bg-dark">
			{/* <header className="absolute inset-x-0 top-0 z-50">
				<nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">WellNest</span>
							<img alt="" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
						</a>
					</div>

					<div className=" lg:flex lg:flex-1 lg:justify-end">
						<a href="/login" className="text-sm/6 font-semibold ">
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
			</header> */}

			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
					{/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
						<div className="relative rounded-full px-3 py-1 text-sm/6  ring-1 ring-gray-900/10 hover:ring-gray-900/20">
							Announcing our next round of funding.{" "}
							<a href="#" className="font-semibold text-indigo-400">
								<span aria-hidden="true" className="absolute inset-0" />
								Read more <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div> */}
					<div className="text-center">
						<h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">Personalized Wellness Tips, Powered by AI</h1>
						<p className="mt-8 text-pretty text-lg font-medium mx-auto max-w-3xl text-gray-300 sm:text-xl/8">Personalized health tips based on your local weather. From hydration reminders to clothing advice, stay prepared every day.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Get My Wellness Tips
							</a>
							<a href="/login" className="text-sm/6 font-semibold text-gray-200">
								Learn How It Works <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
