import React from 'react';
import { FiEdit, FiInbox, FiBell } from 'react-icons/fi'; // Importing icons from react-icons
import { Link } from 'react-router-dom';
import Allposts from '../allposts/Allposts';
import Inbox from '../inbox/Inbox';

function Newsfeed() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        {/* Buttons */}
        <div className="flex justify-between w-full md:w-auto space-x-4">
          {/* Post Button */}
          <Link to='/post' className="text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <button>
              <FiEdit className="h-5 w-5 mx-auto" />
            </button>
          </Link>
          {/* Inbox Button */}
          <Link to='/inbox' className="text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <button>
              <FiInbox className="h-5 w-5 mx-auto" />
            </button>
          </Link>
          {/* Notification Button */}
          <Link to='/notification' className="text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto">
            <button>
              <FiBell className="h-5 w-5 mx-auto" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-grow bg-gray-100">
        {/* Newsfeed content */}
        <div className="px-1 py-4 flex-grow mx-1 lg:mx-6 w-3/4 lg:h-screen lg:overflow-y-scroll">
          <Allposts />
        </div>

        {/* Inbox section (visible on medium or larger screens) */}
        <div className="hidden md:block w-1/3 mt-4 mr-2 rounded-md bg-white shadow-md lg:h-screen lg:overflow-y-scroll">
          <div className="p-2">
              <Inbox></Inbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsfeed;
