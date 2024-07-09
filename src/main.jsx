import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Search from './components/search/Search.jsx'
import Privateroute from '../src/routes/Privateroute'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login/Login.jsx'
import Home1 from './components/home/Home1.jsx'
import Bodysection1 from './components/body/Bodysection1.jsx'
import Contact from './components/contact/Contact.jsx'
import Authprovider from './components/provider/Authprovider.jsx'
import Profile from './components/profile/Profile.jsx'
import Signup from './components/register/Signup.jsx'
import Userdetail from './components/register/Userdeatil.jsx'
import Newsfeed from './components/newsfeed/Newsfeed.jsx'
import Post from './components/post/Post.jsx'

const fetchPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return []; // Return empty array or handle error
    });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      { 
        path:'/',
        element:<Home1></Home1>

      },
        {
          path:'about',
          element:<About></About>
        },
        {
          path:'search',
          element:<Search></Search>
        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Signup></Signup>
        },
       {
        path:'/userdetail',
        element:<Userdetail></Userdetail>

       },
        {
          path:'bodyseection1',
          loader:fetchPosts,
          element:<Bodysection1></Bodysection1>
        },
        {
          path:'contact',
          element:<Contact></Contact>
        },
        {
          path:'profile',
          element:<Privateroute><Profile></Profile></Privateroute>
        },
        {
          path:'/news',
          element:<Newsfeed></Newsfeed>
        },
        {
          path:'/post',
          element:<Post></Post>
        }

      ],
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Authprovider>
   <RouterProvider router={router} />
   </Authprovider>
  </React.StrictMode>,
)
