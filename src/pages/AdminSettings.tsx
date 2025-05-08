import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog, FaHome, FaAddressBook, FaCodeBranch, FaRoute, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const AdminSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: localStorage.getItem('darkMode') === 'true',
    language: 'en',
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    // Validate passwords
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setPasswordError('Authentication token not found. Please login again.');
        setLoading(false);
        navigate('/AdminLogin');
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data.success) {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        alert('Password changed successfully');
      } else {
        setPasswordError(response.data.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Password change error:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem('adminToken');
            navigate('/AdminLogin');
            return;
          }
          setPasswordError(err.response.data.message || 'Failed to change password. Please try again.');
        } else if (err.request) {
          setPasswordError('No response from server. Please check your connection.');
        } else {
          setPasswordError('Error setting up request. Please try again.');
        }
      } else {
        setPasswordError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', settings.darkMode.toString());
  }, [settings.darkMode]);

  const handleSettingChange = (setting: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center text-white">Admin Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/Admin/admin" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/admin" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaHome className="mr-3" /> Dashboard
            </Link>
            <Link to="/Admin/admincontactus" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/admincontactus" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaAddressBook className="mr-3" /> Contact Us Request
            </Link>
            <Link to="/Admin/adminbranch" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/adminbranch" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaCodeBranch className="mr-3" /> Branch Management
            </Link>
            <Link to="/Admin/adminroot" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/adminroot" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaRoute className="mr-3" /> Route Management
            </Link>
            <Link to="/Admin/adminevent" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/adminevent" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaCalendarAlt className="mr-3" /> Event Management
            </Link>
            <Link to="/Admin/adminsettings" className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === "/Admin/adminsettings" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <FaCog className="mr-3" /> Settings
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <Link to="/Admin/logout" className="flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition-all">
              <FaSignOutAlt className="mr-3" /> Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-6">
          {/* Change Password */}
          <div className="border-b dark:border-gray-700 pb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input type="password" id="currentPassword" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" required />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input type="password" id="newPassword" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" required />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" required />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" disabled={loading}>
                {loading ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="border-b dark:border-gray-700 pb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Notification Settings</h2>
            <div className="space-y-4">
              <SettingToggle label="Dark Mode" description="Enable dark theme for the admin panel" checked={settings.darkMode} onChange={(v) => handleSettingChange('darkMode', v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingToggle = ({ label, description, checked, onChange }: { label: string, description: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium dark:text-white">{label}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default AdminSettings;
