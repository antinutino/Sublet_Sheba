import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Bodysection1 from '../body/Bodysection1';
import { Link } from "react-router-dom";

export default function Home1() {
  const [start, setstart] = useState(false);

  return (
    <>
      <div className="hero min-h-screen bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/0B4jX4h/Property-Luxury-Apartments-Promotion-Instagram-Post-2.png)' }}>
        <div className="hero-overlay bg-opacity-70 bg-black"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="mt-4 lg:mt-2">
            <div className="w-full pb-4 flex flex-col justify-center items-center">
            <div className="overflow-hidden w-full whitespace-nowrap mb-4">
      <h1 className="inline-block overflow-hidden w-full text-3xl font-bold text-blue-500 animate-grow">Find Your Home</h1>
    </div>
              
              <p className="text-lg lg:text-xl font-semibold pb-2">Why Choose <span className="text-xl lg:text-2xl font-bold bg-amber-500 rounded-md p-1">SUBLET SHEBA?</span></p>
              <div className="flex justify-center items-center ">
                <ul className="text-left">
                  <li className="flex items-center text-lg font-bold"><IoIosCheckmarkCircle className="mr-2 text-green-500" /> Seamless Experience</li>
                  <li className="flex items-center text-lg font-bold"><IoIosCheckmarkCircle className="mr-2 text-green-500" /> Verified Listings</li>
                  <li className="flex items-center text-lg font-bold"><IoIosCheckmarkCircle className="mr-2 text-green-500" /> Secure Transactions</li>
                  <li className="flex items-center text-lg font-bold"><IoIosCheckmarkCircle className="mr-2 text-green-500" /> 24/7 Customer Support</li>
                </ul>
              </div>
              <Link to='/about'><button className="btn btn-outline p-1 mt-2 mb-8 text-white border-white">View Details</button></Link>
              <Link to='/news'><button className="btn btn-primary px-6 py-2 text-xl">Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        {start && <Bodysection1 />}
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <section className="py-12 ">
          <h2 className="text-3xl font-bold text-center text-amber-950 mb-6">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-2">User-Friendly Interface</h3>
              <p className="text-gray-700">Our platform is designed to be intuitive and easy to navigate, allowing users to find or list sublets with just a few clicks.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-2">Comprehensive Listings</h3>
              <p className="text-gray-700">Browse through a wide range of listings, complete with detailed descriptions, high-quality images, and virtual tours.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-2">Advanced Search Filters</h3>
              <p className="text-gray-700">Use our robust search filters to find sublets that match your specific requirements, including location, price range, amenities, and more.</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-100 rounded-md">
          <h2 className="text-3xl font-bold text-center text-amber-950 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">For Subletters:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Create an Account: Sign up for a free account on Sublet Sheba.</li>
                <li>List Your Property: Provide detailed information about your property, including rent price, availability dates, and amenities.</li>
                <li>Connect with Renters: Respond to inquiries and connect with potential renters through our secure messaging system.</li>
                <li>Secure Payment: Receive payments securely through our platform.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">For Renters:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Search Listings: Use our advanced search filters to find sublets that meet your criteria.</li>
                <li>Contact Subletters: Reach out to subletters directly through our messaging system to ask questions and schedule viewings.</li>
                <li>Book Your Sublet: Once you find the perfect sublet, book it securely through our platform.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-amber-950 mb-6">Testimonials</h2>
          <div className="space-y-4">
            <blockquote className="bg-white p-6 shadow-lg rounded-lg">
              <p className="italic text-gray-700">“Sublet Sheba made finding a short-term rental so easy! The process was smooth, and I found the perfect place within days.”</p>
              <footer className="text-right text-gray-500">- Jane Doe</footer>
            </blockquote>
            <blockquote className="bg-white p-6 shadow-lg rounded-lg">
              <p className="italic text-gray-700">“I was able to sublet my apartment while I traveled for work, and the secure payment system gave me peace of mind. Highly recommend!”</p>
              <footer className="text-right text-gray-500">- John Smith</footer>
            </blockquote>
          </div>
        </section>
      </div>
    </>
  )
}
