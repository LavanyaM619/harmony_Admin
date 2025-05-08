import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Root {
  _id?: string;
  name: string;
  address: string;
  district: string;
  phoneNumber: string;
  managerName: string;
  hours: string;
}

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

const RootAdd = () => {
  const [root, setRoot] = useState<Root>({
    name: '',
    address: '',
    district: '',
    phoneNumber: '',
    managerName: '',
    hours: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.root) {
      setRoot(location.state.root);
    }
  }, [location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRoot({ ...root, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = root._id ? 'PUT' : 'POST';
      const url = root._id
        ? `${import.meta.env.VITE_API_BASE_URL}/roots/${root._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/roots`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(root),
      });

      if (response.ok) {
        alert('Root saved successfully');
        navigate('/admin/adminroot');
      } else {
        alert('Failed to save root');
      }
    } catch (error) {
      console.error('Error saving root:', error);
      alert('An error occurred while saving the root');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{root._id ? 'Edit Root' : 'Add Root'}</h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Route Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={root.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Route Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={root.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* District */}
        <div className="mb-4">
          <label htmlFor="district" className="block text-gray-700">District</label>
          <select
            id="district"
            name="district"
            value={root.district}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={root.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Manager Name */}
        <div className="mb-4">
          <label htmlFor="managerName" className="block text-gray-700">Manager Name</label>
          <input
            type="text"
            id="managerName"
            name="managerName"
            value={root.managerName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Working Hours */}
        <div className="mb-4">
          <label htmlFor="hours" className="block text-gray-700">Working Hours</label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={root.hours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          {root._id ? 'Update Root' : 'Add Root'}
        </button>
      </form>
    </div>
  );
};

export default RootAdd;
