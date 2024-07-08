
import React, { useContext, useState } from 'react';
import auth from '../../firebase/firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import Authprovider, { AuthContext } from '../provider/Authprovider';

function Login() {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error,seterror]=useState(null);
   const {login}=useContext(AuthContext);
   const navigate=useNavigate();

  // Handle form input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Perform login logic here (e.g., submit data to server, validate credentials)
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email);

    login(email,password)
    .then(result=>{
      navigate('/');
    })
    .catch(error=>{
      console.log(error);
     seterror(error);
    })
    setFormData({
      email: '',
      password: ''
    });
  }

  return (
    <div className="flex items-center justify-center lg:h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <div className="mt-2 mb-6">
          <p >Don't have an account?<Link to='/signup' className='font-semibold text-blue-500'>SignUp</Link> here</p>
          </div>
        </form>

        <div>
            {
              error&&<div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className='text-sm'>Warning: Invalid email or password!</span>
            </div>
            }
        </div>
      </div>
    </div>
  );
}

export default Login;
