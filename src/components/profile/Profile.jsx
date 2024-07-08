import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/Authprovider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // const [userProfile, setUserProfile] = useState(null);
  // const [isEdit, setIsEdit] = useState(false);
  // const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userdata,setuserdata]=useState([]);

  // const [updatedProfile, setUpdatedProfile] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   address: ''
  // });

  useEffect(() => {
    fetch('https://finding-error-jq6eun21b-maharaj-hossains-projects.vercel.app/usererror')
      .then(result => result.json())
      .then(data => {
        // setUserProfile(data);
        // setUpdatedProfile(data);
        setuserdata(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  // const handleLogout = () => {
  //   logout()
  //     .then(() => {
  //       navigate('/');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const handleEditToggle = () => {
  //   setIsEdit(!isEdit);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUpdatedProfile({
  //     ...updatedProfile,
  //     [name]: value
  //   });
  // };

  // const handleSave = () => {
  //   // Implement save functionality here
  //   setUserProfile(updatedProfile);
  //   setIsEdit(false);
  // };

  // if (!userProfile) {
  //   return <div>Loading...</div>;
  // }

  // const { firstName, lastName, email, phone, address, photo } = userProfile;

  return (
    <div className="container mx-auto p-6">
  {
    userdata.map((data, index) => (
      <div key={index} className="user-details">
        <p>First Name: {data.firstName}</p>
        <p>Last Name: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
      </div>
    ))
  }
</div>
  );
}
