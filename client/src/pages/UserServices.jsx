import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserServices() {
  const [activeScreen, setActiveScreen] = useState("screen1");
  const { authToken } = useContext(AuthContext);
  const [openServices, setOpenServices] = useState([]);
  const [ongoingServices, setOngoingServices] = useState([]);
  const [completedServices, setCompletedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        console.log("Fetching user services...");
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Response data:", res.data);
        setOpenServices(res.data.data?.openServices || []);
        setOngoingServices(res.data.data?.ongoingServices || []);
        setCompletedServices(res.data.data?.completedServices || []);
      } catch (error) {
        console.error("Error fetching user services:", error);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchUserServices();
  }, [api, authToken]);

  if (loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center h-screen justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 font-serif">
      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeScreen === "screen1"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveScreen("screen1")}
        >
          Open Services
        </button>
        <button
          className={`py-2 px-4 ${
            activeScreen === "screen2"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveScreen("screen2")}
        >
          Ongoing Services
        </button>
        <button
          className={`py-2 px-4 ${
            activeScreen === "screen3"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveScreen("screen3")}
        >
          Completed Services
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {activeScreen === "screen1" && (
          <ServiceList title="Open Services" services={openServices} isOpen={true} />
        )}
        {activeScreen === "screen2" && (
          <ServiceList title="Ongoing Services" services={ongoingServices} isOpen={false} />
        )}
        {activeScreen === "screen3" && (
          <ServiceList title="Completed Services" services={completedServices} isOpen={false} />
        )}
      </div>
    </div>
  );
}

function ServiceList({ title, services, isOpen }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-4">{title}</h2>
      {services.length > 0 ? (
        <div className="grid gap-4">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} isOpen={isOpen} />
          ))}
        </div>
      ) : (
        <p className="text-center">No services available.</p>
      )}
    </div>
  );
}

function ServiceCard({ service, isOpen }) {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility

  const imageUrl = service.serviceImage?.trim()
    ? `${api}/serviceImages/${service.serviceImage}`
    : "https://via.placeholder.com/150";

  // Handle card click to show the popup only for Open Services
  const handleCardClick = () => {
    if (isOpen) {
      setIsPopupOpen(true); // Open the popup only for open services
    }
  };

  // Handle Review action - Redirect to RequestDisplay page with the service ID
  const handleReviewClick = (e) => {
    e.stopPropagation();
    navigate(`/displayService/${service._id}`);
    setIsPopupOpen(false); 
  };

  // Handle Update action (Placeholder for now)
  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/editService/${service._id}`);
    setIsPopupOpen(false); // Close the popup
  };

  // Handle Delete action (Placeholder for now)
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    alert("Delete functionality is not implemented yet.");
    setIsPopupOpen(false); // Close the popup
  };

  // Close the popup
  const handleClosePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  };

  return (
    <div className="relative flex bg-white shadow-md rounded-lg overflow-hidden border h-40 font-serif">
      <div
        className="relative flex bg-white shadow-md rounded-lg overflow-hidden border h-40 font-serif cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Service Image */}
        <img
          src={imageUrl}
          alt={service.title}
          className="w-36 h-full object-cover"
        />
        {/* Service Details */}
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mt-4">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-3 line-clamp-2">
              {service.description}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              <strong className="text-blue-900">Skills:</strong>{" "}
              {service.skills?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
        {/* Credits Badge */}
        <div className="flex gap-2 items-center absolute top-2 right-2 text-white bg-blue-950 py-1 px-3 m-1 rounded-2xl">
          <p className="text-md font-semibold">{service.credits}</p>
          <BiSolidCoinStack size={20} />
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg p-6 w-1/3">
              {/* Close Icon */}
              <button
                className="absolute top-2 right-2 text-gray-500 text-2xl z-10"
                onClick={handleClosePopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Popup Content */}
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Select an Action</h3>
              <div className="flex flex-col space-y-4">
                <button
                  className="bg-blue-950 text-white py-2 px-4 rounded-xl"
                  onClick={handleReviewClick}
                >
                  Review
                </button>
                <button
                  className="bg-green-800 text-white py-2 px-4 rounded-xl"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-xl"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
