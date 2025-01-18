import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const OfferCard = (props) => {
  const api = import.meta.env.VITE_URL;
  const offer = props.offer;
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("");
    console.log("clicked");
  };
  const handleBookmark = (event) => {
    event.stopPropagation();
    console.log("bookmark clicked");
  };
  return (
    <div className="rounded-lg shadow-lg relative overflow-hidden">
      {/* Bookmark Icon Overlay */}
      <div className="absolute top-2 right-2 z-10 cursor-pointer">
        <FaRegBookmark
          onClick={handleBookmark}
          className="text-white text-xl hover:text-gray-200"
        />
      </div>

      {/* Image Container */}
      <div className="relative h-1/2 overflow-hidden">
        <img
          src={`${api}/images/{offer.img}`}
          className="object-cover object-center w-full h-full"
          alt={offer.title}
        />
      </div>

      {/* Cost Overlay */}
      <div
        name="cost"
        className="absolute left-0 w-full flex justify-center items-center gap-3 z-20  bg-opacity-70 "
        style={{ top: "calc(50% - 1.5rem)" }}
      >
        <div className="bg-white rounded-full flex items-center px-3 py-1">
          <p>{offer.cost}</p>
          <BiSolidCoinStack className="text-xl" />
        </div>
      </div>
      {/* Content */}
      <div className="p-4 pt-14">
        <h2 className="font-semibold text-lg">{offer.title}</h2>
        <p className="text-gray-600 text-sm">{offer.business}</p>
      </div>
    </div>
  );
};

export default OfferCard;
