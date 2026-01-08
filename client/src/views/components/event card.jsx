import { Link, useNavigate } from "react-router-dom";
import { createBooking } from '../../services/api.js';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  if (!event) return null;

  const { id, title, image, location, date, description, price } = event;

  // Correct booking handler
  const bookEvent = async () => {
    try {
      // Call your API to create a booking
      await createBooking({ eventId: id });

      // Redirect to bookings page
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error booking event");
    }
  };

  return (
    <div className="max-w-sm bg-white rounded overflow-hidden shadow-md">
      <img
        src={image || "/event-placeholder.png"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description || "No description available"}</p>
        <div className="text-sm text-gray-700 mb-3">
          <div><strong>Location: </strong>{location || "Not specified"}</div>
          <div><strong>Date: </strong>{date ? new Date(date).toLocaleDateString() : "Not specified"}</div>
          <div><strong>Price: </strong>{price ? `₹${price}` : "Free"}</div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/events/${id}`}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
          >
            Details
          </Link>

          <button
            onClick={bookEvent}
            className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
