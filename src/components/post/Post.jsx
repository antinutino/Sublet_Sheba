import React, { useState } from 'react';

function Post() {
  const [formData, setFormData] = useState({
    district: '',
    subdistrict: '',
    rent: '',
    title: '',
    details: ''
  });

  function handleChange(e) {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData); // For demonstration, log form data to console

    // try {
    //   const result = await authService.createAccount(formData);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    //   setError(error.message);
    // }
    setFormData({
      district: '',
      subdistrict: '',
      rent: '',
      title: '',
      details: ''
    });
  }

  return (
    <div className="mx-4 lg:max-w-md lg:mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter district name"
                required
              />
            </div>
            <div>
              <label htmlFor="subdistrict" className="block text-sm font-medium text-gray-700">Subdistrict</label>
              <input
                type="text"
                id="subdistrict"
                name="subdistrict"
                value={formData.subdistrict}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter subdistrict name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent</label>
            <input
              type="text"
              id="rent"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Per month"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your title"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
              placeholder="Enter details"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 mb-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
