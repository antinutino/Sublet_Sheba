import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns'; // Import date formatting function
import { AuthContext } from '../provider/Authprovider';
import service from '../../appwrite/data_config'; // Replace with correct path to your service
import { ImLocation } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Userposts() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (user) {
                    const userposts = await service.getUserPosts(user.email); // Assuming documents contain posts
                    setPosts(userposts);
                }
            } catch (error) {
                setError(error.message); // Handle error fetching user posts
            }
        };

        fetchUserPosts();
    }, [user]);

    const handleDelete = async () => {
        try {
            const deletedValue = await service.deletePost(deletePostId);
            if (deletedValue) {
                setPosts(posts.filter(post => post.$id !== deletePostId)); // Remove the deleted post from the state
                setIsDeleted(true);
                setDeletePostId(null); // Reset the delete post ID
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete the post.');
        }
    };

    const showDeleteConfirmation = (postId) => {
        setDeletePostId(postId);
    };

    const handleCancel = () => {
        setDeletePostId(null);
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetch fails
    }

    return (
        <div className="w-full px-0 md:px-8 lg:px-16">
            {isDeleted && <div className="text-center py-4 text-green-500">Post has been deleted successfully.</div>}
            {posts.length === 0 ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="bg-white shadow-md rounded-lg p-6 overflow-hidden">
                            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                            <div className="flex flex-col text-gray-600 text-sm mb-4">
                                <div className='flex items-center'>
                                    <span className='text-xl font-bold mr-1'><CgProfile /></span>
                                    <h3 className='text-xl font-bold'>{post.name}</h3>
                                </div>
                                <span className="mr-2">{format(new Date(post.$createdAt), 'MMMM dd, yyyy')}</span>
                            </div>
                            <h3 className='flex flex-row items-center'><span className='text-base font-semibold'><ImLocation /></span>{post.district},{post.subdistrict}</h3>
                            <h3><span className='text-lg font-semibold'>Rent:</span>{post.rent}</h3>
                            <div className='w-full'><p className="text-lg mb-4"><span className='text-lg font-semibold'>Detail Information:</span>{post.details}</p></div>
                            <div className='flex flex-row'>
                                <img className='rounded-sm mx-1 w-1/2 h-64 object-cover' src={post.photo1} alt="photo1" />
                                <img className='rounded-sm mr-1 w-1/2 h-64 object-cover' src={post.photo2} alt="photo2" />
                            </div>
                            <div className="flex space-x-2 my-4">
                                <button 
                                    onClick={() => showDeleteConfirmation(post.$id)} 
                                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    <span className="text-xl font-bold"><MdDelete /></span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {deletePostId && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-1 rounded-lg shadow-lg">
                        <h2 className="text-sm lg:text-xl mb-4">Are you sure you want to delete this post?</h2>
                        <div className="flex">
                            <button 
                                onClick={handleDelete} 
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Confirm
                            </button>
                            <button 
                                onClick={handleCancel} 
                                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Userposts;
