import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEventById } from "../../controllers/event_controller";
import { createBooking } from "../../controllers/booking_controller.jsx";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!id) return;
    getEventById(id).then((data) => {
      if (mounted) setEvent(data);
    });
    return () => (mounted = false);
  }, [id]);

  if (!event) return <div className="p-4">Loading...</div>;

  const availableSeats = event.availableSeats ?? event.seats;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={event.image || "/event-placeholder.png"}
        alt={event.title}
        className="w-full h-96 object-contain rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

      <div className="mb-4 text-sm text-gray-700 space-y-2">
        <div>
          <strong>Location: </strong>
          {event.location}
        </div>
        <div>
          <strong>Date: </strong>
          {new Date(event.date).toLocaleString()}
        </div>
        <div>
          <strong>Price: </strong>
          {event.price ? `₹${event.price}` : "Free"}
        </div>
        <div>
          <strong>Total Seats: </strong>
          {event.seats ?? "N/A"}
        </div>
        <div>
          <strong>Available Seats: </strong>
          {availableSeats ?? "N/A"}
        </div>
      </div>

      {event.description && (
        <p className="mb-4 text-gray-800">{event.description}</p>
      )}

      <div className="flex gap-2">
        <Link to="/events" className="text-sm px-3 py-1 bg-gray-200 rounded">
          Back
        </Link>

        <button
          onClick={async () => {
            await createBooking({
              eventId: event.id,
              eventTitle: event.title,
              tickets: 1,
            });
            navigate("/bookings");
          }}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
