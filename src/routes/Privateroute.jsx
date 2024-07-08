import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/provider/Authprovider";
import { Navigate } from "react-router-dom";

const Privateroute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }


  if (user) {
    return children;
  }
  
  return <Navigate to='' />;
};

export default Privateroute;
