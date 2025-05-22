import Image from "next/image";
import Link from "next/link";

/**
 * Required images in public directory:
 * - /public/apartment-hero.jpg (recommended size: 1200x800px)
 * - /public/community.jpg (recommended size: 1000x600px)
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to Apna Complex
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your complete solution for modern apartment living. Manage your residential experience with ease and efficiency.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </Link>
                <Link 
                  href="/about" 
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="bg-gray-200 rounded-lg shadow-xl aspect-[3/2] relative overflow-hidden">
                <Image
                  src="/apartment-hero.jpg"
                  alt="Modern Apartment Complex"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintenance Requests</h3>
              <p className="text-gray-600">Easy submission and tracking of maintenance requests for quick resolution.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Notice Board</h3>
              <p className="text-gray-600">Stay updated with community announcements and important notifications.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visitor Management</h3>
              <p className="text-gray-600">Efficient visitor tracking and security management system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/maintenance" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
              <p className="text-gray-600">Submit and track maintenance requests</p>
            </Link>

            <Link href="/notice-board" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-2">Notice Board</h3>
              <p className="text-gray-600">View community announcements</p>
            </Link>

            <Link href="/payments" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-2">Payments</h3>
              <p className="text-gray-600">Manage maintenance payments</p>
            </Link>

            <Link href="/contact" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-2">Help Desk</h3>
              <p className="text-gray-600">Get support and assistance</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-gray-600 mb-8">
                Be part of a thriving community where residents come together to create a better living environment. Participate in community events, share your feedback, and help make our complex a better place to live.
              </p>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
              >
                Join Now
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-200 rounded-lg shadow-xl aspect-[5/3] relative overflow-hidden">
                <Image
                  src="/community.jpg"
                  alt="Community"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Assistance?</h2>
          <p className="text-white text-lg mb-8">
            Our support team is here to help you with any questions or concerns.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
