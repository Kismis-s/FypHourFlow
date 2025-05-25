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
    <div className="font-serif bg-white shadow-lg rounded-lg overflow-hidden w-[330px] h-[450px] border border-gray-200 flex flex-col">
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

      <div className="flex flex-col flex-grow px-6 pt-4 pb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-900">{group.name}</h1>
          <button
            className="text-sm bg-blue-950 hover:bg-blue-700 text-white py-1 px-5 rounded-md transition duration-200 mr-1"
            onClick={() => console.log("Joining group:", group._id)}
          >
            Join
          </button>
        </div>

        <p className="text-gray-600 text-sm mt-3">
          {group.description.split(" ").length > 12
            ? group.description.split(" ").slice(0, 12).join(" ") + " ...more"
            : group.description}
        </p>

        <div className="mt-3">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Skills: </span>
            {group.skills.join(", ")}
          </p>
        </div>

        <div className="flex-grow"></div>

        <button
          onClick={handleClick}
          className="mt-4 rounded-lg w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 transition duration-300 ease-in-out"
        >
          View Group
        </button>
      </div>
    </div>
  );
}
