import React, { useState, useEffect } from "react";
import a1 from "../assets/a1.jpg";
import a2 from "../assets/a2.jpg";
import a3 from "../assets/a3.jpg";

const achievements = [
  {
    id: 1,
    title: "5,000+ Hours Exchanged",
    text: "More than 5,000 service hours have been exchanged on HourFlow, empowering local communities and professionals to collaborate on projects that drive real change. Our platform has enabled users to share their expertise, mentor others, and support community initiatives—making every hour count.",
    image: a3,
  },
  {
    id: 2,
    title: "300+ Professionals Connected",
    text: "HourFlow has successfully connected over 300 skilled professionals from various industries. These collaborations have not only sparked innovative projects but also fostered knowledge exchange, leading to new opportunities and growth for both individuals and local businesses.",
    image: a1,
  },
  {
    id: 3,
    title: "150+ Successful Exchanges",
    text: "Our platform has facilitated more than 150 successful skill exchanges, where participants have completed projects ranging from creative collaborations to technical problem-solving. These exchanges have enhanced professional development and built stronger, more resilient community networks.",
    image: a2,
  },
];

const AchievementSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = achievements.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(achievements) || achievements.length === 0) {
    return null;
  }

  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-8 border text-gray-800 font-serif h-72 ">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
        <div className="relative z-10">
          <h3 className="achievement-title text-3xl font-bold mb-4 text-blue-950">
            {achievements[current].title}
          </h3>
          <p className="achievement-text text-lg leading-relaxed mb-5 text-gray-800">
            {achievements[current].text}
          </p>
          <p className="achievement-note text-base italic text-gray-600">
            Discover how every skill shared makes a lasting impact.
          </p>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={achievements[current].image}
          alt={`Achievement ${current + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AchievementSlider;
