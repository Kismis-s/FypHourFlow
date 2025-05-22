import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RequestCard(props) {
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;
  const request = props.request;
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`${api}/user/getUser/${request.client}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setClient(res.data.data);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [api, authToken, request.client]);

  const handleClick = () => {
    navigate(`/displayService/${request._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-serif bg-white shadow-lg rounded-lg overflow-hidden w-80 border border-gray-200 flex flex-col">
      {/* Image with Status Badge */}
      <div className="relative">
        <img
          src={`${api}/serviceImages/${request.serviceImage}`}
          className="w-full h-48 object-cover"
          alt="Request Image"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-3 m-2 py-2 rounded-lg">
          {request.status}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 space-y-2">
        {/* Title and Credits */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{request.title}</h1>
          <div className="flex gap-2 items-center text-white bg-blue-950 p-1 pl-3 pr-3 rounded-2xl">
            <p className="text-md font-semibold">{request.credits}</p>
            <BiSolidCoinStack size={20} />
          </div>
        </div>

        {/* Client Profile */}
        <div className="flex gap-3 items-center">
          {client?.photo && (
            <img
              src={`${api}/uploads/${client.photo}`}
              className="w-10 h-10 rounded-full"
              alt="Client Avatar"
            />
          )}
          <h2 className="text-md font-semibold text-gray-700">
            {client ? client.name : "Client not found"}
          </h2>
        </div>

        {/* Skills */}
        <p className="text-gray-600 text-sm font-sem">
          <span className="font-semibold">Skills: </span>
          {request.skills.join(", ")}
        </p>

        <div className="flex-grow"></div>

        {/* Review Button */}
        <button
          className="rounded-lg w-full text-bold bg-green-700 hover:bg-green-800 text-white py-2 px-4 transition duration-300 ease-in-out"
          onClick={handleClick}
        >
          Review
        </button>
      </div>
    </div>
  );
}
