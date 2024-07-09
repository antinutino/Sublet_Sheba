import { RiMenu2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../provider/Authprovider";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const {user,logout}=useContext(AuthContext);
  const handlelogout=()=>{
    logout()
    .then(()=>console.log("loged out"))
    .catch(error=>{
     console.log(error);
    })

  }

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const navbtnclick=()=>{
    setNavOpen(!navOpen);
  }

  return (
    <div className="flex justify-between m-2 relative">
      <div>
        <button onClick={toggleNav}>
          <RiMenu2Line className="text-4xl hover:bg-slate-300 p-1 rounded-xl" />
        </button>
        {navOpen && (
          <div className="block flex-col absolute top-10 left-0 p-2 bg-white rounded-md z-50">
            <Link to=''><button onClick={navbtnclick} className="mb-1 hover:bg-zinc-200 rounded-lg text-sm w-1/3 text-left px-2 py-1">Home</button></Link>
            <Link to='about'><button onClick={navbtnclick} className="mb-1 hover:bg-zinc-200 rounded-lg text-sm w-1/3 text-left px-2 py-1">About</button></Link>
            <Link to='contact'><button onClick={navbtnclick} className="hover:bg-zinc-200 rounded-lg text-sm w-1/3 text-left px-1 py-1">Contact</button></Link>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-amber-950 text-lg md:text-2xl ml-5 mt-1 font-semibold font-serif">SUBLET SHEBA</h1>
      </div>
      <div className="flex items-center">
        <div className="ml-2">
          <Link to='search'>
            <button>
              <IoMdSearch className="text-4xl hover:bg-slate-300 p-1 rounded-xl" />
            </button>
          </Link>
        </div>
        <div className="ml-1">
          {
            user?<Link to='profile'><button><CgProfile className="text-4xl hover:bg-slate-300 hover:rounded-lg p-1 font-semibold"></CgProfile></button></Link>:<Link to='login'>
            <button className="hover:bg-slate-300 hover:rounded-lg p-1 mb-1 text-md font-semibold">Login</button>
          </Link>
          }
         <div>
          {
            user&& <button
            onClick={handlelogout}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Log Out
          </button>
          }
         </div>
        </div>
      </div>
    </div>
  );
}
