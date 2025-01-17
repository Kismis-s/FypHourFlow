import React, { useState } from "react";

function TabsWithBadges() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="text-base font-medium text-center text-gray-500">
      {/* Tabs */}
      <ul className="flex flex-wrap -mb-px justify-center">
        <li className="me-2">
          <button
            onClick={() => setActiveTab("skills")}
            className={`inline-block p-3 rounded-t-lg ${
              activeTab === "skills"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
            }`}
          >
            Skills
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("services")}
            className={`inline-block p-3 rounded-t-lg ${
              activeTab === "services"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
            }`}
          >
            Services
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`inline-block p-3 rounded-t-lg ${
              activeTab === "reviews"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
            }`}
          >
            Reviews
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "skills" && (
          <div className="flex flex-wrap gap-3 justify-center">
            {["Cooking", "Community Service", "Cleaning", "Babysitting", "Pet Sitting", "Aged Care"].map(
              (skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        )}
        {activeTab === "services" && <div>Services content goes here.</div>}
        {activeTab === "reviews" && <div>Reviews content goes here.</div>}
      </div>
    </div>
  );
}

export default TabsWithBadges;
