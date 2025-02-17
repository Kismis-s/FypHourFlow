import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function OpenServices() {
  const [openServices, setOpenServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        console.log("Fetching open services...");
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setOpenServices(res.data.data?.openServices || []);
      } catch (error) {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-900">Open Services</h2>
        <button
          className="px-4 py-1 bg-green-700 text-white rounded"
          onClick={()=> navigate("/postRequest")}
        >
          Create
        </button>
      </div>
      <div className="grid gap-4">
        {openServices.length > 0 ? (
          openServices.map((service) => (
            <ServiceCard key={service._id} service={service} isOpen={true} />
          ))
        ) : (
          <p className="text-center">No open services available.</p>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ service, isOpen }) {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const imageUrl = service.serviceImage?.trim()
    ? `${api}/serviceImages/${service.serviceImage}`
    : "https://via.placeholder.com/150";

  const handleCardClick = () => {
    if (isOpen) {
      setIsPopupOpen(true);
    }
  };

  const handleReviewClick = (e) => {
    e.stopPropagation();
    navigate(`/displayService/${service._id}`);
    setIsPopupOpen(false);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/editService/${service._id}`);
    setIsPopupOpen(false); // Close the popup
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No authorization token found");
      return;
    }

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this service?"
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${api}/user/deleteService/${service._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
    }
  };

  const handleClosePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  };

  return (
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

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-1/3">
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
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Select an Action
            </h3>
            <div className="flex flex-col space-y-4">
              <button
                className="bg-blue-950 text-white py-2 px-4 rounded-xl"
                onClick={handleReviewClick}
              >
                Review
              </button>
              <button
                className="bg-yellow-600 text-white py-2 px-4 rounded-xl"
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
  );
}
