import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/Authprovider";
import { useNavigate } from "react-router-dom";
import { Service } from "../../appwrite/data_config"; // Import your Service class from services/service.js
import { FiEdit, FiInbox } from 'react-icons/fi'; // Import edit and inbox icons

const service = new Service(); // Instantiate your service

export default function Profile() {
  const { user, logout } = useContext(AuthContext); // Get user context and logout function
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null); // State to hold user data
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDetail = await service.getUserDetails(user.email); // Fetch user details by email
        setUserData(userDetail); // Set user data state
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    }

    if (user) {
      fetchUserData(); // Fetch user data on component mount if user is available
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      navigate('/'); // Navigate to home page after logout
    } catch (error) {
      console.log(error);
      // Handle logout error
    }
  };
  // console.log(userData.photo);
  return (
    <div className="container mx-auto p-6">
      {userData ? (
        <div className="flex items-center justify-center">
          {/* Profile Picture */}
          <img
            src={userData.photo} // Assuming user data includes a photo field
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover"
          />
          <div className="ml-4">
            {/* User Name */}
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            {/* Address */}
            <p>{userData.address}</p>
            {/* Email */}
            <p>{userData.email}</p>
            {/* Edit and Inbox Buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => { /* Handle edit functionality */ }}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FiEdit className="h-5 w-5" />
                <span className="ml-2">Edit</span>
              </button>
              <button
                onClick={() => { /* Handle inbox functionality */ }}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FiInbox className="h-5 w-5" />
                <span className="ml-2">Inbox</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {/* User Posts Section (Replace with actual user posts logic) */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">User Posts</h3>
        <div className="border-t border-gray-200 mt-4 pt-4">
          {/* Placeholder for user posts */}
          <p>User posts will go here...</p>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-500">
        {/* Footer content */}
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </div>
  );
}
