import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProfile() {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    "Machine Learning",
    "DevOps",
  ];
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    birthday: "",
    phone: "",
    email: "",
    profession: "",
    skills: [],
    photo: null,
    cover: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(res.data.data);
        const fetchedData = res.data.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: fetchedData.name || "",
          birthday: fetchedData.birthday || "",
          city: fetchedData.city || "",
          country: fetchedData.country || "",
          email: fetchedData.email || "",
          phone: fetchedData.phone || "",
          profession: fetchedData.profession || "",
          skills: fetchedData.skills || [],
        }));
        setPhotoPreview(fetchedData.photo || null);
        setCoverPreview(fetchedData.cover || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      // Remove skill
      setFormData({
        ...formData,
        skills: formData.skills.filter((s) => s !== skill),
      });
    } else {
      // Add skill
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      // preview image
      const reader = new FileReader();
      reader.onload = () => {
        if (name === "photo") setPhotoPreview(reader.result);
        if (name === "cover") setCoverPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profession", formData.profession);
      formData.skills.forEach((skill) =>
        formDataToSend.append("skills[]", skill)
      );
      if (formData.photo) formDataToSend.append("photo", formData.photo);
      if (formData.cover) formDataToSend.append("cover", formData.cover);

      const res = await axios.patch(`${api}/user/editProfile`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.data.status === "Profile updated!") {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      alert("Failed to update profile. Please check your input.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10 mb-20 font-serif">

      <h2 className="text-3xl font-semibold mb-6  text-blue-900">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Profile Picture
          </label>
          <div className="flex items-center space-x-6">
            {photoPreview && (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer text-sm text-gray-600 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Cover Picture Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Background Picture
          </label>
          <div className="flex items-center space-x-6">
            {coverPreview && (
              <div className="w-35 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer text-sm text-gray-600 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="9800000000"
            />
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block mb-2 font-medium text-gray-700"
            >
              Birthday
            </label>
            <input
              type="text"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="23 January, 2002"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block mb-2 font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kathmandu"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block mb-2 font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bagmati"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="profession"
              className="block mb-2 font-medium text-gray-700"
            >
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Developer"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block font-medium">Skills:</label>
          <button
            type="button"
            onClick={() => setSkillsDropdown(!skillsDropdown)}
            className={`w-full p-3 border rounded-md flex justify-between items-center bg-white`}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
