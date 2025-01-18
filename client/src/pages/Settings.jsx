import React, { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
const Settings = () => {
  const [activeContent, setActiveContent] = useState("profile");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const sidebarItems = [
    { id: "profile", label: "Edit Profile" },
    { id: "help", label: "Help & Support" },
    { id: "logout", label: "Logout" },
  ];

  const handleSidebarItemClick = (id) => {
    setActiveContent(id);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <LoggedNavbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex w-4/5 max-w-6xl bg-white rounded-lg shadow-md">
          <div className="w-64 bg-gray-800 text-white rounded-l-lg p-5">
            <ul className="list-none p-0 m-0">
              {sidebarItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSidebarItemClick(item.id)}
                  className={`py-2 px-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                    activeContent === item.id ? "bg-gray-700" : ""
                  }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 p-5">
            {activeContent === "profile" && <EditProfile />}
            {activeContent === "help" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Help & Support</h2>
                <p>Find solutions and contact support.</p>
              </div>
            )}
            {activeContent === "logout" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Logout</h2>
                <p>Are you sure you want to logout?</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
