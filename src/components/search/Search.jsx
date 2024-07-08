import { useEffect, useState } from "react";
export default function Search() {
  const [data, setdata] = useState([]);
  const [division, setdivision] = useState('');
  const [district, setdistrict] = useState('');
  const[upazila,setupazila]=useState('');
  const [formData, setFormData] = useState({
    division: '',
    district: '',
    upazila: '',
  });

  // Handle form input changes
  function handleChangediv(e) {
    const value = e.target.value;
    setdivision(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }
  function handleChangedist(e) {
    const value = e.target.value;
    setdistrict(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }
  function handleChangeupa(e) {
    const value = e.target.value;
    setupazila(value);
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  function handlesearch(e) {
    e.preventDefault();
    // Perform registration logic here (e.g., submit data to server, validate fields)
    console.log(formData); // For demonstration, log form data to console
    // Clear form fields after submission (optional)
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
        setdata(data);
      }) // Update state with fetched data
  }, []);

  // district.forEach(division => {
  //  if(division.division_name==='Dhaka')
  //   division.districts.map(dist=>{
  //         if(dist.district_name==='Dhaka')
  //           {
  //             dist.upazilas.map(thana=>{
  //               console.log(thana);
  //             })
  //           }
  //   });

  // })
  // const dhaka=districts.filter((dist)=>{districts.division_name=='Dhaka'});
  // console.log(dhaka);

  return (

    <div className="mb-4 mx-8 lg:mx-52">
        <h2 className="text-slate-400 font-semibold text-lg text-center mt-8 mb-6">Find Your Home</h2>
      <form onSubmit={handlesearch}>
        <div>
          <label htmlFor="division" className="block text-lg font-medium text-gray-700 ">Division</label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChangediv}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data.map((division, index) => (
              <option key={index} value={division.division_name}>
                {division.division_name}
              </option>))
            }
          </select>
        </div>
        <div>
          <label htmlFor="district" className="block text-lg font-medium text-gray-700 ">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChangedist}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data.map((div) =>(
               (div.division_name === division)&&( div.districts.map((dist,index) =>(
                <option key={index} value={dist.district_name}>
                  {dist.district_name}
                </option>)) ) 
              
            )

            )
            }
          </select>
        </div>


        <div>
          <label htmlFor="upazila" className="block text-lg font-medium text-gray-700 ">Sub-district</label>
          <select
            id="upazila"
            name="upazila"
            value={formData.upazila}
            onChange={handleChangeupa}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select one</option>
            {data.map((div) =>(
               (div.division_name === division)&&( div.districts.map((dist) =>(
                dist.district_name===district)&&(dist.upazilas.map((thana,index)=>(<option key={index} value={thana}>
                  {thana}
                </option>)))
            
            ) ) 
              
            )

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
      </form>
    </div>
  )
}