import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
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
        const res = await axios.get(
          `${api}/user/getUserById/${request.client}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setClient(res.data.data);
      } catch (error) {
        console.error("Error fetching client:", error);
        // Handle error appropriately (e.g., display an error message)
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [api, authToken, request.client]); // Add dependencies

  const handleClick = () => {
    navigate(`/request/${request._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <img
        src={`${api}/images/${request.image}`}
        className="h-1/2"
        alt="Request Image"
      />
      <div className="flex items-center justify-between">
        <h1>{request.title}</h1>
        <div className="flex gap-2 items-center">
          <p>{request.credits}</p>
          <BiSolidCoinStack />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {client && client.image && (
          <img
            src={`${api}/images/${client.image}`}
            className="rounded"
            alt="Client Avatar"
          />
        )}
        <div>
          <h2>{client ? client.name : "Client not found"}</h2>
        </div>
      </div>
      <p>{request.skills}</p>
      <button
        className="rounded-lg w-full text-bold bg-green p-3"
        onClick={handleClick}
      >
        Review
      </button>
    </div>
  );
}
