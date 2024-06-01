import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 pt-[72px] font-poppins">
      <header className="bg-gray-800 text-white py-5 text-center">
        <div className="mx-auto">
          <h1 className="text-3xl mb-2">Contact Us</h1>
          <p className="text-lg">Get in touch with us for any inquiries or support</p>
        </div>
      </header>

      <section className="bg-gray-500 py-10 shadow-md">
        <div className="mx-auto">
          <h2 className="text-2xl text-center mb-8">Send Us a Message</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
              <input type="text" id="name" placeholder="Enter your name" className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
              <input type="email" id="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-bold mb-2">Message</label>
              <textarea id="message" placeholder="Enter your message" className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg h-40"></textarea>
            </div>
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md text-lg transition duration-300 ease-in-out hover:bg-gray-600">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
