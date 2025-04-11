import React from "react";
import { useNavigate } from "react-router-dom";

export default function GroupCard(props) {
  const api = import.meta.env.VITE_URL;
  const group = props.group;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/displayGroup/${group._id}`); 
  };

  if (!group) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Group not found
      </div>
    );
  }

  return (
    <div className="font-serif bg-white shadow-lg rounded-lg overflow-hidden w-[330px] h-auto border border-gray-200 relative">
      {/* Background Image (Increased height) */}
      <div className="h-48 w-full relative">
        <img
          src={
            group.image
              ? `${api}/groupImages/${group.image}`
              : "https://via.placeholder.com/280x120"
          }
          className="w-full h-full object-cover"
          alt="Group cover"
        />
      </div>

      <div className="pt-4 px-6 pb-5 space-y-4">
        <div className="flex items-center justify-between">
          {/* Group Name */}
          <h1 className="text-xl font-bold text-blue-900">{group.name}</h1>

          {/* Join Button */}
          <button
            className="text-sm bg-blue-950 hover:bg-blue-700 text-white py-1 px-5 rounded-md transition duration-200 mr-1"
            onClick={() => {
              // Replace with your join logic
              console.log("Joining group:", group._id);
            }}
          >
            Join
          </button>
        </div>

        <p className="text-gray-600 text-base">{group.description}</p>

        {/* Skills */}
        <div>
          <p className="text-gray-600 text-sm font-sem">
            <span className="font-semibold">Skills: </span>
            {group.skills.join(", ")}
          </p>
        </div>

        {/* View Group Button */}
        <button
          onClick={handleClick}
          className="rounded-lg w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 transition duration-300 ease-in-out"
        >
          View Group
        </button>
      </div>
    </div>
  );
}
