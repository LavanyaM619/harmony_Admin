import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Branch {
  _id?: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  manager: string;
  hours: string;
}

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

const BranchAdd = () => {
  const [branch, setBranch] = useState<Branch>({
    name: '',
    address: '',
    district: '',
    phone: '',
    manager: '',
    hours: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.branch) {
      setBranch(location.state.branch);
    }
  }, [location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = branch._id ? 'PUT' : 'POST';
      const url = branch._id
        ? `${API_BASE_URL}/branches/${branch._id}`
        : `${API_BASE_URL}/branches`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branch),
      });

      if (response.ok) {
        alert('Branch saved successfully');
        navigate('/Admin/adminbranch');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to save branch');
      }
    } catch (error) {
      console.error('Error saving branch:', error);
      alert('An error occurred while saving the branch');
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{branch._id ? 'Edit Branch' : 'Add Branch'}</h2>

        {/* Branch Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Branch Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={branch.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Branch Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={branch.address}
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
            value={branch.district}
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

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={branch.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="manager" className="block text-gray-700">Manager Name</label>
          <input
            type="text"
            id="manager"
            name="manager"
            value={branch.manager}
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
            value={branch.hours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
        >
          {branch._id ? 'Update Branch' : 'Add Branch'}
        </button>
      </form>
    </div>
  );
};

export default BranchAdd;
