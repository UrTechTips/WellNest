import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const AddActivityComp = ({ setState, addActivity }) => {
	const [activityName, setActivityName] = useState("");
	const handleAddActivity = () => {
		setState(false);
		addActivity(activityName);
	};
	return (
		<>
			<DialogBackdrop transition className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel transition className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
									<PlusCircleIcon aria-hidden="true" className="h-6 w-6 text-blue-600" />
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
									<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
										Add Activity
									</DialogTitle>
									<div className="mt-2">
										<p className="text-sm text-gray-500">Add a exercise that you completed today.</p>
									</div>
									<div className="mt-6">
										<label for="first_name" class="block mb-2 text-m  text-gray-900 font-semibold">
											First name
										</label>
										<input type="text" id="first_name" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required value={activityName} onChange={(e) => setActivityName(e.target.value)} />
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button type="button" onClick={handleAddActivity} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
								Add Activity
							</button>
							<button type="button" data-autofocus onClick={() => setState(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</>
	);
};

export default AddActivityComp;
