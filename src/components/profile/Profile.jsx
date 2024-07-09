import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/Authprovider";
import { useNavigate } from "react-router-dom";
import { Service } from "../../appwrite/data_config"; // Import your Service class from services/service.js
import { FiEdit, FiInbox } from 'react-icons/fi'; // Import edit and inbox icons
import Userposts from '../showposts/Userposts'
const service = new Service(); // Instantiate your service

export default function Profile() {
  const { user, logout } = useContext(AuthContext); // Get user context and logout function
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null); // State to hold user data
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userDetail = await service.getUserDetails(user.email); // Fetch user details by email
          setUserData(userDetail);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    fetchUserData();
  }, [user]);
  console.log(user.email);

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      navigate('/'); // Navigate to home page after logout
    } catch (error) {
      console.log(error);
      // Handle logout error
    }
  };

  return (
    <div className="container mx-auto p-6 w-full lg:w-2/3 bg-slate-200 rounded-lg">
      {userData ? (
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={userData.photo} // Assuming user data includes a photo field
            alt="Profile"
            className="rounded-full h-24 w-24 lg:h-48 lg:w-48 object-cover mb-4"
          />
          {/* User Name */}
          <h2 className="text-2xl font-bold">{user.name}</h2>
          {/* Address, Email, Phone */}
          <div className="flex flex-col items-center mt-2">
            <p>{userData.address}</p>
            <p>{userData.email}</p>
          </div>
          {/* Edit and Inbox Buttons */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => { /* Handle edit functionality */ }}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <FiEdit className="h-5 w-5" />
              <span className="ml-2">Post</span>
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
      ) : (
        <div>Loading...</div>
      )}
      {/* User Posts Section (Replace with actual user posts logic) */}
      <div className="mt-8 ">
        <div className="border-t border-gray-200 mt-4 pt-4">
          <Userposts></Userposts>
        </div>
        <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 self-end"
          >
            Logout
          </button>
      </div>
      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-500">
        {/* Footer content */}
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
