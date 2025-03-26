import React from "react";

function Badge({ badge }) {
  const api = import.meta.env.VITE_URL;
  const imageUrl = badge.achievementImages?.trim()
    ? `${api}/achievementImages/${badge.achievementImages}`
    : "https://via.placeholder.com/150";

  return (
    <div className="flex flex-col items-start px-5 py-2">
      <img
        src={imageUrl}
        alt="Achievement Badge"
        className="w-20 h-20 rounded-full border border-gray-300"
        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
      />
      {badge.name && <p className="text-xs mt-1">{badge.name}</p>}
    </div>
  );
}

export default Badge;
