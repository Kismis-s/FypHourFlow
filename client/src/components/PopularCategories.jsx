import React from "react";
import { useNavigate } from "react-router-dom";

export default function PopularCategories(props) {
  const api = import.meta.env.VITE_URL;
  const category = props.category;
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("");
    console.log("clicked");
  };
  return (
    <div className="flex items-center" onClick={handleClick}>
      <img src={`${api}/images/${category.img}`} />
      <div>{category.discount}</div>
    </div>
  );
}
