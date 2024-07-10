import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { FiEdit, FiInbox } from 'react-icons/fi';
import { AuthContext } from '../provider/Authprovider';
import service from '../../appwrite/data_config';
import { ImLocation } from "react-icons/im";
import { CgProfile } from "react-icons/cg";

function Allposts() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [inbox, setInbox] = useState({
        title: '',
        details: '',
        username: '',
        useremail: '',
        reciveremail: '',
        postid: ''
    });
    const [commitStatus, setCommitStatus] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (user) {
                    const allposts = await service.getAllPosts();
                    setPosts(allposts);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserPosts();
    }, [user]);

    const handleCommit = async (post) => {
        const newInbox = {
            title: post.title,
            details: post.details,
            username: user.name,
            useremail: user.email,
            reciveremail: post.email,
            postid: post.$id
        };
        setInbox(newInbox);

        try {
            const response = await service.setInboxData(newInbox);
            setCommitStatus((prevStatus) => ({
                ...prevStatus,
                [post.$id]: true
            }));
            setShowModal(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const closeModal = () => setShowModal(false);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full">
            {posts.length === 0 ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="bg-white shadow-md rounded-lg p-2 overflow-hidden">
                            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
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
                                    onClick={() => handleCommit(post)} 
                                    className={`flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                        commitStatus[post.$id] ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white`}
                                    disabled={commitStatus[post.$id]}
                                >
                                    <span className="text-base font-bold">
                                        {commitStatus[post.$id] ? 'Response Sent' : 'Get Committed'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4">Response Sent</h2>
                        <p>Your response has been sent successfully.</p>
                        <button 
                            onClick={closeModal} 
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Allposts;
