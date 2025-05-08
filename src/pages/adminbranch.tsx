import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBuilding, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaEdit, FaTrash,
  FaHome, FaAddressBook, FaCodeBranch, FaRoute, FaCalendarAlt, FaSignOutAlt, FaCog
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Branch {
  _id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
  district: string;
}

const AdminBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        if (response.ok) {
          const data: Branch[] = await response.json();
          setBranches(data);
        } else {
          alert('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
        alert('An error occurred while fetching branches');
      }
    };

    fetchBranches();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/branches/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBranches(branches.filter(branch => branch._id !== id));
          alert('Branch deleted successfully');
        } else {
          alert('Failed to delete branch');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('An error occurred while deleting the branch');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {[
              { to: "/Admin/admin", label: "Dashboard", icon: <FaHome /> },
              { to: "/Admin/admincontactus", label: "Contact Us Request", icon: <FaAddressBook /> },
              { to: "/Admin/adminbranch", label: "Branch Management", icon: <FaCodeBranch /> },
              { to: "/Admin/adminroot", label: "Route Management", icon: <FaRoute /> },
              { to: "/Admin/adminevent", label: "Event Management", icon: <FaCalendarAlt /> },
              { to: "/Admin/adminsettings", label: "Settings", icon: <FaCog /> },
            ].map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  location.pathname === to ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
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
      <div className="ml-72 flex-1 p-8">
        <div className="flex items-center mb-6">
          <FaBuilding className="text-3xl text-gray-700 mr-3" />
          <h1 className="text-3xl font-bold text-gray-700">Branch Management</h1>
        </div>

        <Link to="/admin/branchadd">
          <button className="bg-green-500 text-white px-6 py-2 rounded mb-6 hover:bg-green-600 transition-colors">
            Add Branch
          </button>
        </Link>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaBuilding className="inline mr-2" /> Branch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaMapMarkerAlt className="inline mr-2" /> District</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaMapMarkerAlt className="inline mr-2" /> Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaPhone className="inline mr-2" /> Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaUser className="inline mr-2" /> Manager</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><FaClock className="inline mr-2" /> Hours</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {branches.map(branch => (
                <tr key={branch._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.district}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">{branch.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.manager}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.hours}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to="/admin/branchadd" state={{ branch }}>
                      <button
                        className="bg-indigo-600 text-white p-2 rounded-lg mr-2 hover:bg-indigo-700"
                        title="Edit Branch"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700"
                      onClick={() => handleDelete(branch._id)}
                      title="Delete Branch"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {branches.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">No branches found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBranch;
