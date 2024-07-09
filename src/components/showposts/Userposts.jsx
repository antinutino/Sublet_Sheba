import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns'; // Import date formatting function
import { FiEdit, FiInbox } from 'react-icons/fi'; // Import icons if needed
import { AuthContext } from '../provider/Authprovider';
import service from '../../appwrite/data_config'; // Replace with correct path to your service

function Userposts() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (user) {
                    const userposts = await service.getUserPosts(user.email); // Assuming documents contain posts
                    setPosts(userposts);
                    console.log(posts);
                }
            } catch (error) {
                setError(error.message); // Handle error fetching user posts
            }
        };

        fetchUserPosts();
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetch fails
    }

    return (
        <div className="w-full ">
            {posts.length === 0 ? (
                <div className="text-center py-8">No posts available.</div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="bg-white shadow-md rounded-lg px-6 pb-2 pt-6">
                            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                            <div className="flex items-center text-gray-600 text-sm mb-4">
                                <span className="mr-2">{format(new Date(post.$createdAt), 'MMMM dd, yyyy')}</span>
                                {/* Add other metadata if available */}
                            </div>
                            <h3><span className='text-lg font-semibold'>Location:</span>{post.district},{post.subdistrict}</h3>
                            <h3><span className='text-lg font-semibold'>Rent:</span>{post.rent}</h3>
                           <div className='w-full'> <p className="text-lg mb-4"><span className='text-lg font-semibold'>Detail Information:</span>{post.details}</p></div>
                            {/* Add more sections as needed */}
                             <div className='flex flex-row'>
                                <img className='rounded-sm mx-1' src={post.photo1} alt="photo1" />
                                <img className='rounded-sm mr-1' src={post.photo2} alt="photo2" />
                             </div>
                            <div className="flex space-x-2 my-4">
                                {/* Example buttons/icons */}
                                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    <FiInbox className="h-5 w-5" />
                                    <span className="ml-2">Get Commited</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Userposts;
