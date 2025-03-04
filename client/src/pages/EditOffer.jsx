import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";

export default function EditOffer() {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expiration: "",
    credits: "",
    offerImage: null,
  });

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const res = await axios.get(`${api}/user/findOfferById/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const fetchedData = res.data.data;
        setOffer(fetchedData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: fetchedData.title || "",
          description: fetchedData.description || "",
          expiration: fetchedData.expiration || "",
          credits: fetchedData.credits || "",
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offer data:", error);
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [id, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      offerImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.title) formDataToSend.append("title", formData.title);
      if (formData.description)
        formDataToSend.append("description", formData.description);
      if (formData.expiration)
        formDataToSend.append("expiration", formData.expiration);
      if (formData.credits) formDataToSend.append("credits", formData.credits);
      if (formData.offerImage)
        formDataToSend.append("offerImage", formData.offerImage);

      const res = await axios.patch(
        `${api}/user/editOffer/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.data.status === "Offer updated!") {
        alert("Offer updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(
        "Error updating offer:",
        error.response?.data || error.message
      );
      alert("Failed to update offer. Please check your input.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <LoggedNavbar />
      <div className="flex font-serif">
        <div className="w-[20%] bg-blue-50 p-5">
          <div className="flex items-center space-x-2 mb-5 text-blue-800">
            <BsChevronLeft size={20} />
            <button
              onClick={handleCancel}
              className="text-blue-800 font-medium"
            >
              BACK TO USER OFFERS
            </button>
          </div>
        </div>

        <div className="w-4/6 p-10">
          <h2 className="text-2xl font-semibold mb-5">Edit Offer</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="offerImage"
              >
                Upload Offer Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="offerImage"
                type="file"
                name="offerImage"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Offer Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Offer Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="expiration"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Expiration Date
              </label>
              <input
                type="date"
                id="expiration"
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="credits"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Credits
              </label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-3 text-white bg-red-600 hover:bg-red-700 rounded-lg px-5 py-2.5"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
