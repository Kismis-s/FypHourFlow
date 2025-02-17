import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function CompletedServices() {
  const [completedServices, setCompletedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchCompletedServices = async () => {
      try {
        console.log("Fetching completed services...");
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCompletedServices(res.data.data?.completedServices || []);
      } catch (error) {
        setError("Failed to load completed services");
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedServices();
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
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Completed Services
      </h2>
      <div className="grid gap-4">
        {completedServices.length > 0 ? (
          completedServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center">No completed services available.</p>
        )}
      </div>
    </div>
  );

  function ServiceCard({ service }) {
    const api = import.meta.env.VITE_URL;
    const imageUrl = service.serviceImage?.trim()
      ? `${api}/serviceImages/${service.serviceImage}`
      : "https://via.placeholder.com/150";
  
    return (
      <div
        className="relative flex bg-white shadow-lg rounded-xl overflow-hidden border h-44 font-serif cursor-pointer transition-transform transform hover:scale-105"
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
  
}