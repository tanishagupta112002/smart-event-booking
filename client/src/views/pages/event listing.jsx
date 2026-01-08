
import React, { useEffect, useState } from "react";
import EventCard from "../components/event card.jsx";
import { getEvents } from "../../controllers/event_controller";

const EventListing = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		let mounted = true;

		const fetchAndSet = () => {
			getEvents().then((data) => {
				if (mounted) setEvents(data);
			});
		};

		fetchAndSet();
		const handler = () => fetchAndSet();
		window.addEventListener('events:changed', handler);

		return () => {
			mounted = false;
			window.removeEventListener('events:changed', handler);
		};
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">Events</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{events && events.length > 0 ? (
					events.map((ev) => <EventCard key={ev.id} event={ev} />)
				) : (
					<div>No events available.</div>
				)}
			</div>
		</div>
	);
};

export default EventListing;

