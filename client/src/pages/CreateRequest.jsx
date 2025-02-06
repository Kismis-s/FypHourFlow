import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

export default function PostService() {
  const api = import.meta.env.VITE_URL;
  const { authToken, userLocation } = useContext(AuthContext);  // Get the location from context
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
    timeline: "",
    expiration: "",
    skills: "",
    serviceImage: null,
    location: { type: "Point", coordinates: [] },  // Initialize location with empty coordinates
  });

  useEffect(() => {
    if (userLocation) {
      // Set the location from context to form data
      setFormData((prevState) => ({
        ...prevState,
        location: { type: "Point", coordinates: [userLocation.latitude, userLocation.longitude] },
      }));
    }
  }, [userLocation]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("credits", formData.credits);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("timeline", formData.timeline);
    formDataToSend.append("expiration", formData.expiration);
    formDataToSend.append("location", JSON.stringify(formData.location)); // Include location in the form data

    // Only append service image if it exists
    if (formData.serviceImage) {
      formDataToSend.append("serviceImage", formData.serviceImage);
    }

    try {
      const res = await axios.post(`${api}/user/postRequest`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("Service posted successfully!");
    } catch (error) {
      console.error("Error posting service:", error);
      alert("Failed to post the service.");
    }
  };

  return (
    <div>
      <h1>Post a Service</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Credits:</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Timeline:</label>
          <input
            type="text"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expiration:</label>
          <input
            type="date"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Image:</label>
          <input type="file" name="serviceImage" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Post Service</button>
        </div>
      </form>
    </div>
  );
}
