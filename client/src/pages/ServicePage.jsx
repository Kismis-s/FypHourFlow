import React, { useContext, useState, useEffect } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import RequestCard from "../components/RequestCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import service from "../assets/services.jpg";

const ServicePage = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all");
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/user/getServices`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setServices(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleCreate = () => {
    navigate("/postRequest");
  };

  const handleFilterChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Filter services based on selectedRole
  const filteredServices =
    selectedRole === "all"
      ? services
      : services.filter((service) => service.role === selectedRole);

  if (loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <LoggedNavbar />
      <div>
        <div className="flex items-center justify-evenly font-serif">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-primary text-blue-950 ml-1 leading-10">
              Share Skills, Build <span className="text-blue-700">Bonds</span>!
            </h1>
            <p className="text-lg text-secondary text-gray-500 mt-6 pb-5">
              Encouraging acts of service, fostering deeper connections and a
              spirit of <br /> collaboration within communities
            </p>
            <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700">
              Browse Services
            </button>
          </div>
          <img src={service} alt="Placeholder" className="h-80 w-auto" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-950 ml-8 font-serif">
            Requests available
          </h2>
          <div className="flex gap-5 font-serif">
            <div className="flex gap-2 items-center">
              <p>Filter By:</p>
              <select
                className="w-[150px] bg-white text-black px-2 py-1 border rounded-md"
                onChange={handleFilterChange}
                value={selectedRole}
              >
                <option value="all">All</option>
                <option value="try">Gardening</option>
              </select>
            </div>
            <button className="px-4 py-1 mr-10 bg-green-700 text-white rounded" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 m-5">
          {filteredServices.map((request, index) => (
            <RequestCard request={request} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
