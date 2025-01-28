import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import LoggedNavbar from "../components/loggedNavbar";

export default function EditProfile() {
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    province: "",
    birthday: "",
    phone: "",
    email: "",
    profession: "",
    photo: null,
    cover:null
  });
  useEffect(async () => {
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
      name: fetchedData.name,
      birthday: fetchedData.birthday,
      city: fetchedData.city,
      province: fetchedData.province,
      email: fetchedData.email,
      phone: fetchedData.phone,
    }));
    setLoading(false);
  }, []);
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("province", formData.province);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append('photo', formData.photo);
      formDataToSend.append('cover', formData.cover);
  
      const res = await axios.patch(`${api}/user/editProfile`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile. Please check your input.");
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center text-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between font-serif">
        <h2>Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="my-10 w-2/3">
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Upload Profile Picture
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            id="file_input"
            type="file"
            name="photo"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Upload Background Picture
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            id="file_input"
            type="file"
            name="cover"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Contact Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="9800000000"
            required
          />
        </div>
        <div>
          <label
            htmlFor="birthday"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Birthday
          </label>
          <input
            type="text"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="23 January, 2002"
            required
          />
        </div>
        <div className="flex justify-between ">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Kathmandu"
              required
            />
          </div>
          <div>
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Bagmati"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="profession"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Profession
          </label>
          <input
            type="profession"
            id="profession"
            name="profession"
            onChange={handleChange}
            value={formData.profession}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Developer"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
