import React, { useEffect, useState } from "react";
import { getBookings } from "../../services/api.js";

const Bookings = () => {
  const [bookings, setBookings] = useState(null);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error fetching bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking handler
  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      // refresh bookings
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error cancelling booking");
    }
  };

  if (!bookings) return <div className="p-6">Loading...</div>;
  if (!bookings.length) return <div className="p-6">No bookings yet.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Booked Events</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-5 border rounded-lg shadow-sm flex justify-between items-start"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{b.event?.title}</h2>
              <p className="text-sm text-gray-600">
                {b.event?.location || "Location not specified"}
              </p>
              <p className="text-sm text-gray-600">
                📅 {b.event?.date ? new Date(b.event.date).toLocaleDateString() : "Date not specified"}
              </p>
              <p className="text-sm text-gray-600">
                💰 {b.event?.price ? `₹${b.event.price}` : "Free"}
              </p>
              <p className="text-sm text-gray-600">
                {b.event?.description || "No description"}
              </p>
              <img
                src={b.event?.image || "/event-placeholder.png"}
                alt={b.event?.title || "Event image"}
                className="w-48 h-28 object-cover rounded"
              />
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                Booked
              </span>
            </div>

            {/* Cancel Button */}
            <div className="flex items-start">
              <button
                onClick={() => cancelBooking(b.id)}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
