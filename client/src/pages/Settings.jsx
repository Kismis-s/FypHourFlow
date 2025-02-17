import React, { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import UserServices from "./UserServices";
import OpenServices from "./OpenServices";
import OngoingServices from "./OngoingServices";
import CompletedServices from "./CompletedServices";

const Settings = () => {
  const [activeContent, setActiveContent] = useState("profile");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "profile", label: "Edit Profile" },
    { id: "openServices", label: "Open Services" },
    { id: "ongoingServices", label: "Ongoing Services" },
    { id: "completedServices", label: "Completed Services" },
    { id: "help", label: "Help & Support" },
  ];

  const handleSidebarItemClick = (id) => {
    setActiveContent(id);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SettingsContent = ({ children }) => (
    <div className="flex-1 p-5 overflow-auto">{children}</div>
  );

  const Button = ({ onClick, children, className = "" }) => (
    <button
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div>
      <LoggedNavbar />
      <div className="flex justify-center items-start min-h-screen bg-gray-100 font-serif">
        {" "}
        {/* Adjusted for height */}
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
                  tabIndex="0"
                  aria-current={activeContent === item.id ? "page" : null}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button onClick={handleLogout} className="w-full">
                Logout
              </Button>
            </div>
          </div>

          <SettingsContent>
            {activeContent === "profile" && (
              <>
                {(() => {
                  try {
                    return <EditProfile />;
                  } catch (error) {
                    console.error("Error in EditProfile:", error);
                    return <p>Error loading EditProfile</p>;
                  }
                })()}
              </>
            )}

            {activeContent === "openServices" && (
              <>
                {(() => {
                  try {
                    return <OpenServices />;
                  } catch (error) {
                    console.error("Error in Open Services:", error);
                    return <p>Error loading Open Services</p>;
                  }
                })()}
              </>
            )}

            {activeContent === "ongoingServices" && (
              <>
                {(() => {
                  try {
                    return <OngoingServices />;
                  } catch (error) {
                    console.error("Error in Ongoing Services:", error);
                    return <p>Error loading Ongoing Services</p>;
                  }
                })()}
              </>
            )}

            {activeContent === "completedServices" && (
              <>
                {(() => {
                  try {
                    return <CompletedServices />;
                  } catch (error) {
                    console.error("Error in Ongoing Services:", error);
                    return <p>Error loading Ongoing Services</p>;
                  }
                })()}
              </>
            )}

            {activeContent === "help" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Help & Support</h2>
                <p>Find solutions and contact support.</p>
              </div>
            )}
          </SettingsContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
