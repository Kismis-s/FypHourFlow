import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
          onClick={() => navigate("/postRequest")}
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

  const imageUrl = service.serviceImage?.trim()
    ? `${api}/serviceImages/${service.serviceImage}`
    : "https://via.placeholder.com/150";

  const handleCardClick = () => {
    if (isOpen) {
      navigate(`/displayService/${service._id}`);
    }
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/editService/${service._id}`);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      Swal.fire("Error", "No authorization token found", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${api}/user/deleteService/${service._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      Swal.fire("Deleted!", "Your service has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting service:", error);
      Swal.fire("Failed", "Failed to delete the service", "error");
    }
  };

  return (
    <div
      className="relative flex bg-white shadow-md rounded-lg overflow-hidden border h-44 font-serif cursor-pointer hover:shadow-lg transition"
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
        <div className="mt-4">
          <h3 className="text-lg font-bold text-blue-900">{service.title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">
            {service.description}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong className="text-blue-900">Skills:</strong>{" "}
            {service.skills?.join(", ") || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4 mr-4">
          <button
            className="bg-blue-950 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Credits Badge */}
      <div className="flex gap-2 items-center absolute top-2 right-2 text-white bg-blue-950 py-1 px-3 m-1 rounded-2xl">
        <p className="text-md font-semibold">{service.credits}</p>
        <BiSolidCoinStack size={20} />
      </div>
    </div>
  );
}
