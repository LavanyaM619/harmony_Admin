import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Event {
  _id?: string;
  name: string;
  date: string;
  image: string;
  description: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EventAdd = () => {
  const [event, setEvent] = useState<Event>({
    name: "",
    date: "",
    image: "",
    description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.event) {
      const existingEvent = location.state.event;

      setEvent({
        ...existingEvent,
        date: existingEvent.date ? existingEvent.date.split("T")[0] : "",
      });
    }
  }, [location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent({ ...event, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = event._id ? "PUT" : "POST";
      const url = event._id
        ? `${API_BASE_URL}/events/${event._id}`
        : `${API_BASE_URL}/events`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        alert("Event saved successfully");
        navigate("/admin/adminevent");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("An error occurred while saving the event");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          {event._id ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
              required
            />
          </div>

          {/* Event Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Event Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
            />
          </div>

          {/* Image Preview */}
          {event.image && (
            <div className="flex flex-col items-center mt-2">
              <p className="text-gray-700 text-sm mb-2">Image Preview:</p>
              <img
                src={event.image}
                alt="Event"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {event._id ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventAdd;