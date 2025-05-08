import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaEdit, FaTrash, FaHome, FaAddressBook, FaCog, FaCodeBranch, FaRoute, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

interface Root {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  managerName: string;
  hours: string;
  district: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminRoot = () => {
  const [roots, setRoots] = useState<Root[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchRoots = async () => {
      try {
     const response = await fetch(`${API_BASE_URL}/roots`);

        if (response.ok) {
          const data: Root[] = await response.json();
          setRoots(data);
        } else {
          alert('Failed to fetch roots');
        }
      } catch (error) {
        console.error('Error fetching roots:', error);
        alert('An error occurred while fetching roots');
      }
    };

    fetchRoots();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this root?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/roots/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setRoots(roots.filter(root => root._id !== id));
          alert('Root deleted successfully');
        } else {
          alert('Failed to delete root');
        }
      } catch (error) {
        console.error('Error deleting root:', error);
        alert('An error occurred while deleting the root');
      }
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
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Route Management</h1>

        <Link to="/admin/rootadd">
          <button className="bg-green-500 text-white px-6 py-2 rounded mb-6 hover:bg-green-600 transition-colors">Add Root</button>
        </Link>

        {/* Roots Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaBuilding className="mr-2" /> Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> District
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> Address
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaPhone className="mr-2" /> Phone
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Manager Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaClock className="mr-2" /> Hours
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roots.map(root => (
                <tr key={root._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {root.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {root.district}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {root.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {root.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {root.managerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {root.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <Link to={`/admin/rootadd`} state={{ root }}>
                      <button
                        className="bg-indigo-600 text-white p-2 rounded-lg mr-2 hover:bg-indigo-700 transition-colors"
                        title="Edit Root"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 transition-colors"
                      onClick={() => handleDelete(root._id)}
                      title="Delete Root"
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

export default AdminRoot;
