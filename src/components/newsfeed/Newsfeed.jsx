import React from 'react';
import { FiEdit, FiInbox, FiBell } from 'react-icons/fi'; // Importing icons from react-icons

function Newsfeed() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        {/* Buttons */}
        <div className="flex w-full md:w-auto space-x-4">
          {/* Post Button */}
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <FiEdit className="h-5 w-5 mx-auto" />
          </button>
          {/* Inbox Button */}
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <FiInbox className="h-5 w-5 mx-auto" />
          </button>
          {/* Notification Button */}
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <FiBell className="h-5 w-5 mx-auto" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Newsfeed content */}
        <div className="p-4 flex-grow">
          <p className="text-gray-800">Newsfeed content goes here...</p>
        </div>

        {/* Inbox section (visible on medium or larger screens) */}
        <div className="hidden md:block w-1/4 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Inbox</h2>
            {/* Placeholder content */}
            <ul className="divide-y divide-gray-200">
              <li className="py-2">Conversation 1</li>
              <li className="py-2">Conversation 2</li>
              <li className="py-2">Conversation 3</li>
              {/* Add more conversations as needed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsfeed;
