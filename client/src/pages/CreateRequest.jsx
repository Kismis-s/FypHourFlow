import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import LoggedNavbar from "../components/loggedNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function PostService() {
  const api = import.meta.env.VITE_URL;
  const { authToken, userLocation } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
    timeline: "",
    expiration: "",
    skills: [],
    serviceImage: null,
    location: { type: "Point", coordinates: [] },
  });

  const [skillsDropdown, setSkillsDropdown] = useState(false);
  const availableSkills = [
    "Web Development",
    "Graphic Design",
    "Data Analysis",
    "Copywriting",
    "Digital Marketing",
    "Photography",
    "Video Editing",
    "UI/UX Design",
    "Tutoring",
    "Translation",
    "Assistance", 
    "Guitar",
    "Baking"
  ];

  useEffect(() => {
    if (userLocation) {
      setFormData((prevState) => ({
        ...prevState,
        location: {
          type: "Point",
          coordinates: [userLocation.latitude, userLocation.longitude],
        },
      }));
    }
  }, [userLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.credits <= 0) {
      alert("Credits must be greater than 0.");
      return;
    }
    if (formData.skills.length < 1) {
      alert("Please select at least one skill.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("credits", formData.credits);
    formDataToSend.append("skills", JSON.stringify(formData.skills));
    formDataToSend.append("timeline", formData.timeline);
    formDataToSend.append("expiration", formData.expiration);
    formDataToSend.append("location", JSON.stringify(formData.location));

    if (formData.serviceImage) {
      formDataToSend.append("serviceImage", formData.serviceImage);
    }

    try {
      const response = await axios.post(
        `${api}/user/postRequest`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.status === "Successfully posted request!") {
        alert("Request posted successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error posting service:", error);
      alert("Failed to post the service.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoggedNavbar />
      <div className="grid grid-cols-[20%_80%] gap-0 font-serif">
        {/* Sidebar */}
        <div className="flex flex-col bg-blue-50 p-4 text-blue-900">
          <Link
            to="/services"
            className="text-lg font-medium flex items-center gap-2 hover:underline mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            BACK TO SERVICE PAGE
          </Link>
        </div>

        {/* Main Content */}
        <div className="p-8 bg-white max-w-5xl mx-auto w-full m-4">
          <h1 className="font-semibold text-xl text-blue-800 mb-6 ">
            POST A REQUEST
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-medium">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md h-24"
              />
            </div>

            {/* Credits */}
            <div>
              <label className="block font-medium">Credits:</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Skills Dropdown */}
            <div className="relative">
              <label className="block font-medium">Skills:</label>
              <button
                type="button"
                onClick={() => setSkillsDropdown(!skillsDropdown)}
                className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
              >
                {formData.skills.length > 0
                  ? formData.skills.join(", ")
                  : "Select Skills"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-7.5 7.5L4.5 9"
                  />
                </svg>
              </button>

              {skillsDropdown && (
                <div className="absolute w-full mt-2 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill}
                      className={`p-2 cursor-pointer hover:bg-blue-100 ${
                        formData.skills.includes(skill) ? "bg-blue-200" : ""
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label className="block font-medium">Timeline:</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Expiration */}
            <div>
              <label className="block font-medium">Expiration:</label>
              <input
                type="date"
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Service Image */}
            <div>
              <label className="block font-medium">Service Image:</label>
              <input
                type="file"
                name="serviceImage"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-950 text-white font-medium rounded-md hover:bg-blue-800"
              >
                Post a Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
