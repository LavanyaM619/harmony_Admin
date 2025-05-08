import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaImage, FaCalendarAlt, FaEdit, FaTrash, FaHome, FaAddressBook, FaCodeBranch, FaRoute, FaCog, FaSignOutAlt } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Event {
  _id: string;
  name: string;
  date: string;
  image: string;
  description?: string;
  createdAt?: string;
}

const AdminEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`);
        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          setError('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('An error occurred while fetching events');
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 10000); // Refresh the events every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Event deleted successfully');
        setEvents(events.filter(event => event._id !== id));
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event');
    }
  };

  const editEvent = (event: Event) => {
    navigate('/admin/eventadd', { state: { event } });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/Admin/admin"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/admin'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>

            <Link
              to="/Admin/admincontactus"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/admincontactus'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaAddressBook className="mr-3" />
              Contact Us Request
            </Link>

            <Link
              to="/Admin/adminbranch"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/adminbranch'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaCodeBranch className="mr-3" />
              Branch Management
            </Link>

            <Link
              to="/Admin/adminroot"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/adminroot'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaRoute className="mr-3" />
              Route Management
            </Link>

            <Link
              to="/Admin/adminevent"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/adminevent'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaCalendarAlt className="mr-3" />
              Event Management
            </Link>

            <Link
              to="/Admin/adminsettings"
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/Admin/adminsettings'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaCog className="mr-3" />
              Settings
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <Link
              to="/Admin/logout"
              className="flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition-all"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="ml-72 flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Event Management</h1>

        <Link to="/admin/eventadd" className="bg-green-500 text-white px-6 py-2 rounded mb-6 hover:bg-green-600 transition-colors inline-block">
          Add Event
        </Link>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaImage className="mr-2" /> Image
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> Event Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> Date
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> Description
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map(event => (
                <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {event.description || 'No description available'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <button
                      onClick={() => editEvent(event)}
                      className="bg-indigo-600 text-white p-2 rounded-lg mr-2 hover:bg-indigo-700 transition-colors"
                      title="Edit Event"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 transition-colors"
                      title="Delete Event"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEvent;
