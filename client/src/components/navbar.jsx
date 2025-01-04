import Hourflow from "../assets/Hourflow.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="text-gray-700 font-serif m-0">
      {/* Navigation */}
      <nav className="border-b border-gray-200 flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Hourflow} alt="logo" className="h-16 w-16" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-10">
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Offers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              About Us
            </a>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center space-x-20">
          <form className="h-8 w-64 border border-gray-400 rounded-md flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 placeholder-gray-500 text-gray-500 flex-1 border-none outline-none"
            />
            <button type="submit" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>

          {/* Login/Sign Up Buttons */}
          <div className="flex space-x-4">
            <button className="px-3 py-1 border border-blue-950 text-blue-950 rounded hover:bg-blue-600 hover:text-white" onClick={()=>navigate("/signup")}>
              Sign up
            </button>
            <button className="px-3 py-1 bg-blue-950 text-white rounded hover:bg-blue-600 mr-32">
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
