import { useContext, useEffect, useState } from "react";
import { format } from 'date-fns';
import service from "../../appwrite/data_config"; // Ensure this path is correct
import { AuthContext } from "../provider/Authprovider";
import { ImLocation } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
export default function Search() {
  const {user}=useContext(AuthContext);
  const [data, setData] = useState([]);
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [formData, setFormData] = useState({
    division: '',
    district: '',
    upazila: '',
  });
  const [searchPost, setSearchPost] = useState([]);
  const [error, setError] = useState(null);
  const [searchclicked,setsearchclicked]=useState(false);
  const [commitStatus, setCommitStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inbox, setInbox] = useState({
    title: '',
    details: '',
    username: '',
    useremail: '',
    reciveremail: '',
    postid: ''
});
  // Handle form input changes
  function handleChangeDiv(e) {
    const value = e.target.value;
    setDivision(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  function handleChangeDist(e) {
    const value = e.target.value;
    setDistrict(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  function handleChangeUpa(e) {
    const value = e.target.value;
    setUpazila(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  async function handleSearch(e) {
    e.preventDefault();
    setsearchclicked(true);
    // Ensure all required fields are filled
    if (!formData.division || !formData.district || !formData.upazila) {
      setError('All fields are required');
      return;
    }

    // Log the form data to debug
    console.log('Form Data:', formData);

    try {
      const posts = await service.getSearchData(formData.district,formData.upazila); // Fetch posts based on district
      setSearchPost(posts);
      console.log('Search Posts:', searchPost);
      setError(null);
    } catch (error) {
      console.error('Error fetching search data:', error);
      setError('Error fetching data. Please try again.');
    }

    setFormData({
      division: '',
      district: '',
      upazila: ''
    });
  }

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/antinutino/Sublet-Sheba/main/districtdata.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching district data:', error);
        setError('Error fetching district data.');
      });
  }, []);


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
    <div className="mb-4 mx-8 lg:mx-52">
      <h2 className="text-slate-400 font-semibold text-lg text-center mt-8 mb-6">Find Your Home</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="division" className="block text-lg font-medium text-gray-700">Division</label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChangeDiv}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data.map((division, index) => (
              <option key={index} value={division.division_name}>
                {division.division_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="district" className="block text-lg font-medium text-gray-700">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChangeDist}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data
              .filter(div => div.division_name === division)
              .flatMap(div => div.districts.map((dist, index) => (
                <option key={index} value={dist.district_name}>
                  {dist.district_name}
                </option>
              )))
            }
          </select>
        </div>
        <div>
          <label htmlFor="upazila" className="block text-lg font-medium text-gray-700">Sub-district</label>
          <select
            id="upazila"
            name="upazila"
            value={formData.upazila}
            onChange={handleChangeUpa}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data
              .filter(div => div.division_name === division)
              .flatMap(div => div.districts
                .filter(dist => dist.district_name === district)
                .flatMap(dist => dist.upazilas.map((thana, index) => (
                  <option key={index} value={thana}>
                    {thana}
                  </option>
                )))
              )
            }
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-8 mb-12 lg:mb-24 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
     <div>
     {searchclicked&&searchPost.length === 0 ? (
                <div className="text-center py-8">No post is avaliable</div>
            ) : (
                <div className="grid gap-6">
                    {searchPost.map((post) => (
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
                    <div className="bg-white rounded-lg shadow-lg p-2 lg:p-6 w-full mx-4 lg:w-1/3">
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

    </div>
  );
}
