import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import LoggedNavbar from "../components/loggedNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function CreateOffer() {
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
    expiration: "",
    offerImages: null,
    location: { type: "Point", coordinates: [] },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("credits", formData.credits);
    formDataToSend.append("expiration", formData.expiration);

    if (formData.offerImages) {
      formDataToSend.append("offerImages", formData.offerImages);
    }

    try {
      const response = await axios.post(
        `${api}/user/createOffer`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.status === "Offer created successfully!") {
        alert("Offer posted successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error posting offer:", error);
      alert("Failed to post the offer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoggedNavbar />
      <div className="grid grid-cols-[20%_80%] gap-0 font-serif">
        {/* Sidebar */}
        <div className="flex flex-col bg-blue-50 p-4 text-blue-900">
          <Link
            to="/offers"
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
            BACK TO OFFERS PAGE
          </Link>
        </div>

        {/* Main Content */}
        <div className="p-8 bg-white max-w-5xl mx-auto w-full m-4">
          <h1 className="font-semibold text-xl text-blue-800 mb-6 ">
            POST AN OFFER
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

            {/* Offer Image */}
            <div>
              <label className="block font-medium">Offer Image:</label>
              <input
                type="file"
                name="offerImages"
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
                Post the Offer
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
