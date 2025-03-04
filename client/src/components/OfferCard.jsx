import React, { useEffect, useContext, useState } from "react";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const OfferCard = (props) => {
  const api = import.meta.env.VITE_URL;
  const offer = props.offer;
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [offerProvider, setOfferProvider] = useState(null);
  const { authToken } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  useEffect(() => {
    const fetchOfferProvider = async () => {
      try {
        const res = await axios.get(
          `${api}/user/getUser/${offer.offerProvider._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setOfferProvider(res.data.data || res.data);
      } catch (error) {
        console.error("Error fetching offer provider:", error);
      }
    };

    if (offer.offerProvider) {
      fetchOfferProvider();
    }
  }, [api, authToken, offer.offerProvider]);

  const handleClaim = async () => {
    try {
      const response = await axios.post(
        `${api}/user/claimOffer/${offer._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response.data);
      setRequest(response.data);
      setShowPopup(true); // Show popup on success
    } catch (error) {
      console.error("Error claiming offer:", error.response?.data || error);
    }
  };

  // Handle invalid expiration date
  let formattedDate = "N/A";
  if (offer.expiration) {
    const date = new Date(offer.expiration);
    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString();
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64 max-w-[16rem] flex-none border border-gray-200 flex flex-col">
      {/* Image with Cost Badge */}
      <div className="relative h-32 w-full">
        <img
          src={`${api}/offerImages/${offer.offerImages}`}
          className="w-full h-full object-cover"
          alt="Offer Image"
        />

        {/* Cost Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
          {offer.credits} <BiSolidCoinStack className="text-lg" />
        </div>
      </div>

      {/* Offer Details */}
      <div className="p-3 flex flex-col flex-grow text-center justify-between">
        <div>
          {/* Offer Title */}
          <h1 className="text-lg font-bold">{offer.title}</h1>

          <div className="flex gap-3 items-center">
            {offerProvider && offerProvider.photo && (
              <img
                src={`${api}/uploads/${offerProvider.photo}`}
                className="w-8 h-8 rounded-full"
                alt="Client Avatar"
              />
            )}
            <h2 className="text-md font-semibold text-gray-700">
              {offerProvider ? offerProvider.name : "Client not found"}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {offer.description}
          </p>

          {/* Expiration Date */}
          <p className="text-red-600 text-xs mt-1">Expires: {formattedDate}</p>
        </div>

        {/* Claim Button */}
        <button
          className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg py-2 mt-3 transition duration-300 ease-in-out"
          onClick={handleClaim}
        >
          Claim Offer
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-600">Offer Claimed!</h2>
            <p className="text-gray-600">You have successfully claimed the offer.</p>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCard;
