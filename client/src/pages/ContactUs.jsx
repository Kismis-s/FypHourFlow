import React from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";

export default function ContactUs() {
  return (
    <div>
      <LoggedNavbar />
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat font-serif flex justify-center items-start px-4 pt-16 pb-4">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden backdrop-blur-sm">
          {/* Left Section */}
          <div className="md:w-1/2 p-8 bg-blue-950  text-white">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">
              Let’s Connect and Build a Better Community Together!
            </p>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                krishma.khadgi510@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +977-9818808162
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="md:w-1/2 p-8 relative">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Send us a message
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
