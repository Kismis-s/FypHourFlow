import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import LoggedNavbar from "../components/loggedNavbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function PostService() {
  const api = import.meta.env.VITE_URL;
  const { authToken, userLocation } = useContext(AuthContext);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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

  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
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
    "Baking",
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

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.description.trim())
      errors.description = "Description is required.";
    if (!formData.credits) errors.credits = "Credits are required.";
    else if (parseInt(formData.credits) < 1)
      errors.credits = "Credits must be at least 1.";
    if (formData.skills.length === 0)
      errors.skills = "Select at least one skill.";
    if (!formData.timeline.trim()) errors.timeline = "Timeline is required.";
    if (!formData.expiration)
      errors.expiration = "Expiration date is required.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
    setFormErrors((prev) => ({ ...prev, skills: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        serviceImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

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
        setShowSuccessPopup(true); 
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

        <div className="p-8 bg-white max-w-5xl mx-auto w-full m-4">
          <h1 className="font-semibold text-xl text-blue-800 mb-6">
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
                className={`w-full p-3 border rounded-md ${
                  formErrors.title ? "border-red-500" : ""
                }`}
              />
              {formErrors.title && (
                <p className="text-red-600 text-sm mt-1">{formErrors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md h-24 ${
                  formErrors.description ? "border-red-500" : ""
                }`}
              />
              {formErrors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            {/* Credits */}
            <div>
              <label className="block font-medium">Credits:</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  formErrors.credits ? "border-red-500" : ""
                }`}
              />
              {formErrors.credits && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.credits}
                </p>
              )}
            </div>

            {/* Skills Dropdown */}
            <div className="relative">
              <label className="block font-medium">Skills:</label>
              <button
                type="button"
                onClick={() => setSkillsDropdown(!skillsDropdown)}
                className={`w-full p-3 border rounded-md flex justify-between items-center bg-white ${
                  formErrors.skills ? "border-red-500" : ""
                }`}
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
              {formErrors.skills && (
                <p className="text-red-600 text-sm mt-1">{formErrors.skills}</p>
              )}
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
                className={`w-full p-3 border rounded-md ${
                  formErrors.timeline ? "border-red-500" : ""
                }`}
              />
              {formErrors.timeline && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.timeline}
                </p>
              )}
            </div>

            {/* Expiration */}
            <div>
              <label className="block font-medium">Expiration:</label>
              <input
                type="date"
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  formErrors.expiration ? "border-red-500" : ""
                }`}
              />
              {formErrors.expiration && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.expiration}
                </p>
              )}
            </div>

            {/* Service Image */}
            <div>
              <label className="block font-medium">Service Image:</label>
              <input
                type="file"
                name="serviceImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 max-h-40 rounded border"
                />
              )}
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
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center font-serif">
            <h2 className="text-lg font-semibold text-green-800 mb-4">
              Request has been successfully posted!
            </h2>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                navigate(-1);
              }}
              className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
