import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Footer from "../components/footer";

export default function Settings() {
  const { authToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    contactNum: "",
    email: "",
    password: "",
    image: null,
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
      address: fetchedData.address,
      city: fetchedData.city,
      province: fetchedData.province,
      email: fetchedData.email,
      contactNum: fetchedData.contactNum,
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
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contactNum", formData.contactNum);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("province", formData.province);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.image != null) {
      formDataToSend.append("image", formData.image);
    }
    const res = await axios.patch(`${api}/user/dashboard`, formDataToSend, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  };
  if (loading) {
    return (
      <div className="flex items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Edit Profile</h2>
        <img src={`${api}/image/${user.img}`} />
      </div>
      <form onSubmit={handleSubmit} className="my-10 w-2/3">
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            for="file_input"
          >
            Upload Profile Picture
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            id="file_input"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label
            for="name"
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
            for="email"
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
            for="contactNum"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNum"
            name="contactNum"
            value={formData.contactNum}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="9800000000"
            required
          />
        </div>
        <div>
          <label
            for="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Sydney"
            required
          />
        </div>
        <div className="flex justify-between ">
          <div>
            <label
              for="city"
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
              placeholder="Sydney"
              required
            />
          </div>
          <div>
            <label
              for="province"
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
              placeholder="Sydney"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
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
