import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our story and mission
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Our Store</h2>
                <p className="text-gray-600 leading-relaxed">
                  We are passionate about providing high-quality products to our customers. 
                  Our mission is to deliver exceptional shopping experiences with carefully 
                  curated items that meet your needs.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded with a vision to make quality products accessible to everyone, 
                  we've grown from a small local shop to an online marketplace serving 
                  customers nationwide. We take pride in our carefully selected product 
                  range and commitment to customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Quality</h3>
                <p className="mt-2 text-gray-500">We ensure all our products meet high quality standards</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Customer Service</h3>
                <p className="mt-2 text-gray-500">Your satisfaction is our top priority</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Integrity</h3>
                <p className="mt-2 text-gray-500">We operate with honesty and transparency</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Contact Us</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message at{' '}
              <a href="mailto:support@ourstore.com" className="text-indigo-600 hover:text-indigo-800">
                support@ourstore.com
              </a>
              {' '}or call us at{' '}
              <span className="text-indigo-600">(555) 123-4567</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

