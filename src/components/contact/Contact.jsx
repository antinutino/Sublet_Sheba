import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:px-16  bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-amber-950 mb-4 text-center">Contact Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-gray-700">
          Have questions or need assistance? Our support team is here to help! Reach out to us through any of the following ways:
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <ul className="list-none text-gray-700 mb-4">
          <li><strong>Email:</strong> <a href="mailto:support@subletsheba.com" className="text-blue-500">support@subletsheba.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+11234567890" className="text-blue-500">+1 (123) 456-7890</a></li>
          <li><strong>Address:</strong> 123 Main Street, City, Country</li>
        </ul>
        <p className="text-gray-700">Follow us on social media for the latest updates and listings:</p>
        <ul className="list-none text-gray-700">
          <li><strong>Facebook:</strong> <a href="https://facebook.com/subletsheba" className="text-blue-500">facebook.com/subletsheba</a></li>
          <li><strong>Twitter:</strong> <a href="https://twitter.com/subletsheba" className="text-blue-500">twitter.com/subletsheba</a></li>
          <li><strong>Instagram:</strong> <a href="https://instagram.com/subletsheba" className="text-blue-500">instagram.com/subletsheba</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Email" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700">Subject</label>
            <input type="text" id="subject" name="subject" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Subject" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700">Message</label>
            <textarea id="message" name="message" className="w-full p-2 border border-gray-300 rounded-md" rows="5" placeholder="Your Message"></textarea>
          </div>
          <div>
            <button type="submit" className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600">Send Message</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
