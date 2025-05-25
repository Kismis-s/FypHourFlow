import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OfferBanner(props) {
  const banner = props.banner;
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked");
  };

  const handleBookmark = (event) => {
    event.stopPropagation();
    console.log("bookmark clicked");
  };

  return (
    <div onClick={handleClick} className="relative flex items-center">
      <div className="relative">
        {" "}
        <FaRegBookmark
          onClick={handleBookmark}
          className="absolute top-2 left-2 z-10 text-gray-800 cursor-pointer"
        />
        <img
          src={`${api}/image/${banner.img}`}
          className="w-1/2"
          alt="offer banner"
        />
      </div>

      <div className="ml-4">
        <h2 className="text-xl font-semibold">{banner.slogan}</h2>
        <p className="text-gray-600">{banner.description}</p>
        <img src={`${api}/image/${banner.logo}`} alt="brand logo" />
      </div>
    </div>
  );
}
