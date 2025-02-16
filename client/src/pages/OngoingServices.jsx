import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { BiSolidCoinStack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../components/confirmationDialog';

import { jwtDecode } from "jwt-decode";


export default function OngoingServices() {
  const [ongoingServices, setOngoingServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const { authToken } = useContext(AuthContext); // Removed 'role' here
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOngoingServices = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        setOngoingServices(res.data.data?.ongoingServices || []);
      } catch (error) {
        setError('Failed to load ongoing services');
      } finally {
        setLoading(false);
      }
    };
    fetchOngoingServices();
  }, [api, authToken]);

  const handleServiceClick = (serviceId, clientId, providerId) => {
    // Use jwt_decode to decode the token and get user ID
    const userId = jwtDecode(authToken)._id; // Assuming the user ID is stored in the token
    if (userId === clientId) {
      setSelectedServiceId(serviceId);
      setIsDialogOpen(true);
    } else if (userId === providerId) {
      navigate(`/displayService/${serviceId}`);
    } else {
      // If neither client nor provider, maybe show an error or do nothing
      alert('You are not authorized to interact with this service.');
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(
        `${api}/user/completeService/${selectedServiceId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setOngoingServices((prevServices) =>
        prevServices.filter((service) => service._id !== selectedServiceId)
      );
      setIsDialogOpen(false);
      navigate('/transactions');
    } catch (error) {
      setError('Failed to complete the service');
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
                handleServiceClick(service._id, service.client, service.provider)
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
    </div>
  );
}

function ServiceCard({ service, onClick }) {
  const api = import.meta.env.VITE_URL;
  const imageUrl = service.serviceImage?.trim()
    ? `${api}/serviceImages/${service.serviceImage}`
    : 'https://via.placeholder.com/150';

  return (
    <div
      className="relative flex bg-white shadow-md rounded-lg overflow-hidden border h-40 font-serif cursor-pointer"
      onClick={onClick}
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
            <strong className="text-blue-900">Skills:</strong>{' '}
            {service.skills?.join(', ') || 'N/A'}
          </p>
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
