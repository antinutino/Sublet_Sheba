import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/Authprovider.jsx'; // Adjust the path as needed
import service from '../../appwrite/data_config.js'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function Userdetail() {
  const { user } = useContext(AuthContext); // Uncomment if you plan to use user context
  // console.log(user.name); // Uncomment if you plan to log user name
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    address: '',
    phone: '',
    nid: '',
    photo: '',
    role: '' // Added field for role (Owner or Renter)
  });
  console.log(formData);
  const [error, setError] = useState(null);
  
  function handleChange(e) {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user.email);
    
    try {
      await service.setUserDetail(formData);
      console.log('User details saved successfully!');
      navigate('/');
      // Reset form after submission
      setFormData({
        name:'',
        email:'',
        address: '',
        phone: '',
        nid: '',
        photo: '',
        role: ''
      });
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full lg:w-2/3 my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Additional Details</h2>
        {error && (
          <div role="alert" className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label htmlFor="nid" className="block text-sm font-medium text-gray-700">National ID (NID)</label>
              <input
                type="text"
                id="nid"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your NID"
                required
              />
            </div>
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="url"
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Photo URL"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select your role</option>
                <option value="owner">Owner</option>
                <option value="renter">Renter</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 mb-8"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userdetail;
