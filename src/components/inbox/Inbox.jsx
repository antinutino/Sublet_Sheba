import React, { useState, useEffect, useContext } from 'react';
import service from '../../appwrite/data_config'; // Replace with correct path to your service
import { AuthContext } from '../provider/Authprovider';
import { ImLocation } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { format } from 'date-fns';

function Inbox() {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [expandedMessageId, setExpandedMessageId] = useState(null);
    const [reply, setReply] = useState("");
    const [post, setPost] = useState(null);
    const [newReplay, setNewReplay] = useState({
        title: '',
        details: '',
        username: '',
        useremail: '',
        reciveremail: '',
        postid: '',
        message: ''
    });
    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

    useEffect(() => {
        const fetchInboxData = async () => {
            try {
                if (user) {
                    const inboxData = await service.getInboxData(user.email); // Fetch inbox data
                    setMessages(inboxData);
                    console.log(messages);
                }
            } catch (error) {
                setError(error.message); // Handle error fetching inbox data
            }
        };

        fetchInboxData();
    }, [user]);

    const handleSetExpandedMessage = (message) => {
        setExpandedMessageId(message.$id === expandedMessageId ? null : message.$id);
    };

    const handleReplyButtonClick = (message) => {
        setNewReplay({
            title: message.title,
            details: message.details,
            username: user.name,
            useremail: user.email,
            reciveremail: message.useremail,
            postid: message.postid,
            message: '' // Initialize with empty message
        });
        setIsReplyDialogOpen(true);
    };

    const handleSeePost = async (message) => {
        console.log(message.postid);
        try {
            const post = await service.getSinglePost(message.postid);
            setPost(post);
        } catch (error) {
            console.log(error);
        }
    };

    const handleReply = async () => {
        const updatedReplay = { ...newReplay, message: reply };
        try {
            const response = await service.setInboxData(updatedReplay);
            console.log(response);
            setExpandedMessageId(null); // Close the expanded message after sending the reply
            setReply(""); // Clear the reply field
            setIsReplyDialogOpen(false); // Close the reply dialog
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClose = () => {
        setExpandedMessageId(null);
        setReply("");
        setIsReplyDialogOpen(false);
        setPost(null); // Close the post view
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetch fails
    }

    return (
        <div className="p-2 lg:p-4 w-full md:mr-4 border-cyan-500">
            <h2 className="text-xl ml-6 font-bold mb-4">Inbox</h2>
            {messages.length === 0 ? (
                <div className="text-center py-8">message may not be available</div>
            ) : (
                <ul className="divide-y w-full lg:ml-4 divide-gray-200">
                    {messages.map((message) => (
                        <li
                            key={message.$id}
                            className="py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSetExpandedMessage(message)}
                        >
                            {expandedMessageId !== message.$id ? (
                                <div className="flex justify-between items-center px-2 overflow-hidden">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {message.username}
                                        </h3>
                                        <p className="text-sm text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            Post title: {message.title}
                                        </p>
                                        <p className="text-sm text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            Received message: {message.message}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Post title: {message.title}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Received message: {message.message}
                                    </p>
                                    <div className="flex justify-end space-x-4 mt-2">
                                        <button
                                            onClick={() => handleSeePost(message)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-0 md:mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            See Post
                                        </button>
                                        <button
                                            onClick={() => handleReplyButtonClick(message)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-2 md:mr-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {isReplyDialogOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-2 mx-2 lg:p-4 rounded-lg shadow-lg w-full lg:w-1/2">
                        <h2 className="text-base lg:text-2xl mb-2 lg:mb-4">Reply to {newReplay.username}</h2>
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            rows="4"
                            placeholder="Type here..."
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleClose}
                                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReply}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Send Reply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {post && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
                    <div className="bg-white shadow-md rounded-lg p-2 lg:p-4 w-full lg:w-1/2 mx-4 lg:mx-12 max-h-screen overflow-y-auto">
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
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleClose}
                                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inbox
