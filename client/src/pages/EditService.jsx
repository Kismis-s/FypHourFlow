import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import Swal from "sweetalert2";

export default function EditService() {
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { id } = useParams(); 
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    credits: "",
    timeline: "",
    expiration: "",
    serviceImage: null,
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
  ];

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(`${api}/user/findServicebyId/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setService(res.data.data);
        const fetchedData = res.data.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: fetchedData.title || "",
          description: fetchedData.description || "",
          skills: fetchedData.skills?.join(", ") || "",
          credits: fetchedData.credits || "",
          timeline: fetchedData.timeline || "",
          expiration: fetchedData.expiration || "",
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service data:", error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("skills", formData.skills);
      formDataToSend.append("credits", formData.credits);
      formDataToSend.append("timeline", formData.timeline);
      formDataToSend.append("expiration", formData.expiration);
      formDataToSend.append("serviceImage", formData.serviceImage);

      const res = await axios.patch(
        `${api}/user/editService/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.data.status === "Service updated!") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Service updated successfully!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Go back",
        }).then(() => {
          navigate(-1); // Navigate after user confirms
        });
      }
    } catch (error) {
      console.error(
        "Error updating service:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update service. Please check your input.",
      });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the service detail page
  };

  const toggleSkill = (skill) => {
    let updatedSkills = formData.skills.split(", ");
    if (updatedSkills.includes(skill)) {
      updatedSkills = updatedSkills.filter((s) => s !== skill);
    } else {
      updatedSkills.push(skill);
    }
    setFormData({ ...formData, skills: updatedSkills.join(", ") });
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
        {/* Sidebar */}
        <div className="w-[20%] bg-blue-50 p-5">
          <div className="flex items-center space-x-2 mb-5 text-blue-800">
            <BsChevronLeft size={20} />
            <button
              onClick={() => navigate(-1)}
              className="text-blue-800 font-medium"
            >
              BACK TO USER SERVICES
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="w-4/6 p-10">
          <h2 className="text-2xl font-semibold mb-5">Edit Service</h2>
          <form onSubmit={handleSubmit} className="w-full ">
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="serviceImage"
              >
                Upload Service Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                id="serviceImage"
                type="file"
                name="serviceImage"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Service Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Service Title"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Service Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Service description"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm ">Skills</label>
              <button
                type="button"
                onClick={() => setSkillsDropdown(!skillsDropdown)}
                className="w-full py-2 mb-3 px-3 border rounded-md flex justify-between items-center bg-white"
              >
                {formData.skills.length > 0
                  ? formData.skills.split(", ").join(", ")
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full p-2.5"
                placeholder="50"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="timeline"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Timeline
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Timeline for the service"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="flex space-x-5">
              <button
                type="submit"
                className="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-600 bg-wtite border border-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
