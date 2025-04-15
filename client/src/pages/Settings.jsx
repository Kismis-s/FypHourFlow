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
import CreatedOffers from "./PostedOffers";
import ClaimedOffers from "./ClaimedOffers";

const Settings = () => {
  const [activeContent, setActiveContent] = useState("profile");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "profile", label: "Edit Profile" },
    { id: "openServices", label: "Open Services" },
    { id: "ongoingServices", label: "Ongoing Services" },
    { id: "completedServices", label: "Completed Services" },
    { id: "createdOffers", label: "Created Offers" },
    { id: "claimedOffers", label: "Claimed Offers" },
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
      className={`bg-red-500 hover:bg-red-700 text-white font-bold mt-28  mb-4 py-2 px-4 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div>
      <LoggedNavbar />
      <div className="flex justify-center items-start font-serif">
        {" "}
        {/* Adjusted for height */}
        <div className="flex w-full bg-white shadow-md">
          <div className="w-64 bg-blue-50 text-blue-950 p-5">
            <ul className="list-none p-0 m-0">
              {sidebarItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSidebarItemClick(item.id)}
                  className={`py-2 px-4 cursor-pointer transition-colors hover:bg-blue-950 hover:text-white hover:rounded-md ${
                    activeContent === item.id
                      ? "bg-blue-950 text-white rounded-md"
                      : ""
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

            {activeContent === "createdOffers" && (
              <>
                {(() => {
                  try {
                    return <CreatedOffers />;
                  } catch (error) {
                    console.error("Error in showing posted offers", error);
                    return <p>Error loading Posted Offers</p>;
                  }
                })()}
              </>
            )}

            {activeContent === "claimedOffers" && (
              <>
                {(() => {
                  try {
                    return <ClaimedOffers />;
                  } catch (error) {
                    console.error("Error in showing claimed offers", error);
                    return <p>Error loading claimed Offers</p>;
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
