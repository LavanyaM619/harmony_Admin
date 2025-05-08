import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaTrash, FaUser, FaEnvelope, FaComment, FaTimes, FaInbox, FaHome, FaAddressBook, FaCodeBranch, FaCog,FaRoute, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch messages from API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/ContactMessages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [API_BASE_URL]);
  

  // Function to fetch and show a message in the modal
  const handleView = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ContactMessages/${id}`);
      setSelectedMessage(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching message details:', error);
      alert('Failed to fetch message details.');
    }
  };

  // Function to handle message deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/ContactMessages/${id}`);
      
      // Update state to remove the deleted message
      setMessages(messages.filter((message) => message._id !== id));
      
      alert('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete the message');
    }
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
                location.pathname === "/Admin/admin" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>

            <Link 
              to="/Admin/admincontactus" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/admincontactus" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaAddressBook className="mr-3" />
              Contact Us Request
            </Link>

            <Link 
              to="/Admin/adminbranch" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminbranch" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaCodeBranch className="mr-3" />
              Branch Management
            </Link>

            <Link 
              to="/Admin/adminroot" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminroot" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaRoute className="mr-3" />
              Route Management
            </Link>

            <Link 
              to="/Admin/adminevent" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminevent" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaCalendarAlt className="mr-3" />
              Event Management
            </Link>
            <Link 
                          to="/Admin/adminsettings" 
                          className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            location.pathname === "/Admin/adminsettings" 
                              ? "bg-blue-600 text-white" 
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
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

      {/* Main Content */}
      <div className="ml-72 flex-1 p-8 overflow-auto">
        <div className="flex items-center mb-6">
          <FaInbox className="text-3xl text-gray-700 mr-3" />
          <h1 className="text-3xl font-bold text-gray-700">Contact Us Requests</h1>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaComment className="mr-2" /> Subject
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" /> Email
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaComment className="mr-2" /> Message
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {message.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <button
                        className="bg-indigo-600 text-white p-2 rounded-lg mr-2 hover:bg-indigo-700 transition-colors"
                        onClick={() => handleView(message._id)}
                        title="View Message"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 transition-colors"
                        onClick={() => handleDelete(message._id)}
                        title="Delete Message"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-600 py-8">
                    <FaInbox className="mx-auto text-4xl mb-2" />
                    <p>No messages found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing message */}
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <FaComment className="mr-2 text-blue-500" />
                  {selectedMessage.subject}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-3">
                <p className="flex items-center">
                  <FaUser className="mr-2 text-gray-500" />
                  <strong>Name:</strong> {selectedMessage.name}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                <p className="flex items-start">
                  <FaComment className="mr-2 text-gray-500 mt-1" />
                  <strong>Message:</strong> {selectedMessage.message}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactUs;
