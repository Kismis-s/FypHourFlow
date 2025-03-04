import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/confirmationDialog";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import ReviewForm from "../components/ReviewForm";

export default function OngoingServices() {
  const [ongoingServices, setOngoingServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { authToken, id } = useContext(AuthContext); // Removed 'role' here
  const userId = id;
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOngoingServices = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setOngoingServices(res.data.data?.ongoingServices || []);
      } catch (error) {
        setError("Failed to load ongoing services");
      } finally {
        setLoading(false);
      }
    };
    fetchOngoingServices();
  }, [api, authToken]);

  const handleServiceClick = (serviceId, clientId, providerId, service) => {
    if (userId === clientId._id) {
      setSelectedServiceId(serviceId);
      setSelectedService(service);
      setIsDialogOpen(true);
    } else {
      navigate(`/displayService/${serviceId}`);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(
        `${api}/user/completeService/${selectedServiceId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setOngoingServices((prevServices) =>
        prevServices.filter((service) => service._id !== selectedServiceId)
      );
      setIsDialogOpen(false);
      setReviewOpen(true);
    } catch (error) {
      setError("Failed to complete the service");
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

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
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Ongoing Services
      </h2>
      <div className="grid gap-4">
        {ongoingServices.length > 0 ? (
          ongoingServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onClick={() =>
                handleServiceClick(
                  service._id,
                  service.client,
                  service.provider,
                  service
                )
              }
            />
          ))
        ) : (
          <p className="text-center">No Ongoing services available.</p>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Complete Service"
        message="Is the service completed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {isReviewOpen && (
        <ReviewForm
          revieweeId={selectedService.provider._id}
          reviewerId={userId}
        />
      )}
    </div>
  );
}

function ServiceCard({ service, onClick }) {
  const api = import.meta.env.VITE_URL;
  const imageUrl = service.serviceImage?.trim()
    ? `${api}/serviceImages/${service.serviceImage}`
    : "https://via.placeholder.com/150";

  return (
    <div
      className="relative flex bg-white shadow-lg rounded-xl overflow-hidden border h-44 font-serif cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => {
        console.log("Service Card Clicked!");
        onClick();
      }}
    >
      {/* Service Image */}
      <img
        src={imageUrl}
        alt={service.title}
        className="w-40 h-full object-cover"
      />
      {/* Service Details */}
      <div className="ml-4 flex flex-col justify-between flex-grow p-3">
        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-bold text-blue-900 line-clamp-1">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Skills */}
        <p className="text-sm text-gray-500">
          <strong className="text-blue-900">Skills:</strong>{" "}
          {service.skills?.join(", ") || "N/A"}
        </p>

        {/* Client & Provider */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center bg-blue-100 px-3 py-1 rounded-lg">
            <FaUser className="text-blue-900 mr-2" size={14} />
            <p className="text-xs text-gray-700">
              <strong className="text-blue-900">Client:</strong>{" "}
              {service.client?.name || "Unknown"}
            </p>
          </div>
          <div className="flex items-center bg-green-100 px-3 py-1 rounded-lg">
            <FaUser className="text-green-900 mr-2" size={14} />
            <p className="text-xs text-gray-700">
              <strong className="text-green-900">Provider:</strong>{" "}
              {service.provider?.name || "Unknown"}
            </p>
          </div>
        </div>
      </div>
      {/* Credits Badge */}
      <div className="absolute top-2 right-2 bg-blue-950 text-white py-1 px-3 m-1 rounded-2xl flex items-center">
        <p className="text-md font-semibold">{service.credits}</p>
        <BiSolidCoinStack size={20} className="ml-1" />
      </div>
    </div>
  );
}
