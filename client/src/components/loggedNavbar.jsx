import { Link, NavLink, useNavigate } from "react-router-dom";
import Hourflow from "../assets/Hourflow.png";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

function LoggedNavbar() {
  const api = import.meta.env.VITE_URL;
  const { authToken, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    console.log("logout");
    toggleDropdown();
    logout();
    navigate("/");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("called");
      const res = await axios.get(`${api}/user/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(res.data.data);
    };
    fetchProfile();
  }, [authToken]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!user) {
    return (
      <div className="text-gray-700 font-serif m-0">
        <nav className="border-b border-gray-200 flex items-center justify-between px-8 h-16">
          <div className="flex items-center">
            <img src={Hourflow} alt="logo" className="h-16 w-16 ml-4" />
          </div>

          {/* Placeholder for user profile */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-400"></div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="text-gray-700 font-serif m-0">
      {/* Navigation */}
      <nav className="border-b border-gray-200 flex items-center justify-between px-8 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Hourflow} alt="logo" className="h-16 w-16 ml-4" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-10">
          <li>
            <NavLink to="/home" className="hover:text-blue-500">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="hover:text-blue-500">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/offers" className="hover:text-blue-500">
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink to="/groups" className="hover:text-blue-500">
              Groups
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-blue-500">
              Contact
            </NavLink>
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

          <div className="flex flex-row space-x-14">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <img
                  src={`${api}/uploads/${user?.photo || "default-profile.png"}`}
                  alt="profile"
                  id="menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                  className="rounded-full h-10 w-10 mr-2"
                />
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LoggedNavbar;
