import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:px-16 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-amber-950 mb-4 text-center">Sublet Sheba: Your Trusted Subletting Platform</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About Us</h2>
        <p className="text-gray-700">
          Welcome to Sublet Sheba, the ultimate platform for finding and listing sublets effortlessly. Whether you’re a tenant looking to sublet your apartment or a renter searching for a short-term rental, Sublet Sheba is here to make the process seamless and stress-free.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          At Sublet Sheba, our mission is to connect subletters and renters in a secure, transparent, and efficient manner. We aim to provide a comprehensive solution that caters to all subletting needs, ensuring a hassle-free experience for all our users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to navigate, allowing users to find or list sublets with just a few clicks.</li>
          <li><strong>Comprehensive Listings:</strong> Browse through a wide range of listings, complete with detailed descriptions, high-quality images, and virtual tours.</li>
          <li><strong>Advanced Search Filters:</strong> Use our robust search filters to find sublets that match your specific requirements, including location, price range, amenities, and more.</li>
          <li><strong>Secure Transactions:</strong> We prioritize your safety with secure payment methods and verified listings, ensuring that your transactions are safe and reliable.</li>
          <li><strong>Instant Notifications:</strong> Stay updated with instant notifications for new listings, inquiries, and other important updates.</li>
          <li><strong>24/7 Support:</strong> Our dedicated support team is available around the clock to assist you with any questions or issues you may have.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <h3 className="text-xl font-semibold mb-1">For Subletters:</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>Create an Account:</strong> Sign up for a free account on Sublet Sheba.</li>
          <li><strong>List Your Property:</strong> Provide detailed information about your property, including rent price, availability dates, and amenities.</li>
          <li><strong>Connect with Renters:</strong> Respond to inquiries and connect with potential renters through our secure messaging system.</li>
          <li><strong>Secure Payment:</strong> Receive payments securely through our platform.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-1">For Renters:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Search Listings:</strong> Use our advanced search filters to find sublets that meet your criteria.</li>
          <li><strong>Contact Subletters:</strong> Reach out to subletters directly through our messaging system to ask questions and schedule viewings.</li>
          <li><strong>Book Your Sublet:</strong> Once you find the perfect sublet, book it securely through our platform.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Benefits of Using Sublet Sheba</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Wide Selection:</strong> Access a diverse range of sublets in various locations to suit your needs.</li>
          <li><strong>Convenience:</strong> Manage your listings and bookings from anywhere, at any time.</li>
          <li><strong>Cost-Effective:</strong> Save money with affordable sublet options and avoid the hassle of long-term leases.</li>
          <li><strong>Community:</strong> Join a community of like-minded individuals who value flexibility and convenience in their living arrangements.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Testimonials</h2>
        <p className="italic text-gray-700 mb-2">“Sublet Sheba made finding a short-term rental so easy! The process was smooth, and I found the perfect place within days.” - Jane Doe</p>
        <p className="italic text-gray-700">“I was able to sublet my apartment while I traveled for work, and the secure payment system gave me peace of mind. Highly recommend!” - John Smith</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-2">Have questions or need assistance? Our support team is here to help! Contact us at:</p>
        <ul className="list-none text-gray-700">
          <li><strong>Email:</strong> support@subletsheba.com</li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
          <li><strong>Address:</strong> 123 Main Street, City, Country</li>
        </ul>
        <p className="text-gray-700 mt-4">Follow us on social media for the latest updates and listings:</p>
        <ul className="list-none text-gray-700">
          <li><strong>Facebook:</strong> <a href="https://facebook.com/subletsheba" className="text-blue-500">facebook.com/subletsheba</a></li>
          <li><strong>Twitter:</strong> <a href="https://twitter.com/subletsheba" className="text-blue-500">twitter.com/subletsheba</a></li>
          <li><strong>Instagram:</strong> <a href="https://instagram.com/subletsheba" className="text-blue-500">instagram.com/subletsheba</a></li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
