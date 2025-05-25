import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreatedOffers() {
  const [postedOffers, setPostedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedOffers = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPostedOffers(res.data.data?.createdOffers || []);
      } catch (error) {
        setError("Failed to load offers");
      } finally {
        setLoading(false);
      }
    };
    fetchCreatedOffers();
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
        <h2 className="text-xl font-semibold text-blue-900">Created Offers</h2>
        <button
          className="px-4 py-1 bg-green-700 text-white rounded"
          onClick={() => navigate("/createOffer")}
        >
          Create
        </button>
      </div>
      <div className="grid gap-4">
        {postedOffers.length > 0 ? (
          postedOffers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))
        ) : (
          <p className="text-center">No open offers available.</p>
        )}
      </div>
    </div>
  );
}

function OfferCard({ offer }) {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const imageUrl = offer.offerImages?.trim()
    ? `${api}/offerImages/${offer.offerImages}`
    : "https://via.placeholder.com/150";

  const handleUpdateClick = () => {
    navigate(`/editOffer/${offer._id}`);
  };

 const handleDeleteClick = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      text: "No authorization token found",
    });
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this offer?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(
        `${api}/user/deleteOffer/${offer._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Offer deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("Error deleting the offer:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to delete the offer",
      });
    }
  }
};


  return (
    <div className="relative flex bg-white shadow-md rounded-lg overflow-hidden border h-40 font-serif">
      {/* Offer Image */}
      <img
        src={imageUrl}
        alt={offer.title}
        className="w-36 h-full object-cover"
      />

      {/* Offer Details */}
      <div className="ml-4 flex flex-col justify-between flex-grow py-3">
        <div>
          <h3 className="text-lg font-bold text-blue-900">{offer.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            <strong className="text-blue-900">Expiration:</strong>{" "}
            {offer.expiration || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end p-4">
        {/* Credits Badge */}
        <div className="flex gap-2 items-center text-white bg-blue-950 py-1 px-3 rounded-2xl">
          <p className="text-md font-semibold">{offer.credits}</p>
          <BiSolidCoinStack size={20} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            className="bg-blue-800 text-white px-4 py-1 rounded-md text-sm"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-red-600 text-white px-4 py-1 rounded-md text-sm"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
