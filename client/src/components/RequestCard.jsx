import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export default function RequestCard(props) {
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;
  const request = props.request;
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await axios.get(`${api}/getUserById/${request.client}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    setClient(res.data.data);
    setLoading(false);
  }, []);

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
      <img src={`${api}/images/${request.image}`} className="h-1/2" />
      <div className="flex items-center jsutify-between">
        <h1>{request.title}</h1>
        <div className="flex gap-2">
          <p>{request.budget}</p>
          <BiSolidCoinStack />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <img src={`${api}/image/${client.image}`} className="rounded" />
        <div>
          <h2>{client.name}</h2>
          <div className="flex gap-2 items-center">
            <CiLocationOn />
            <p>{client.location}</p>
          </div>
        </div>
      </div>
      <p>{request.requirements}</p>
      <button
        className="rounded-lg w-full text-bold bg-green p-3"
        onClick={handleClick}
      >
        Review
      </button>
    </div>
  );
}
