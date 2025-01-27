import React, { useContext, useState, useEffect } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import RequestCard from "../components/RequestCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

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
        <div className="flex items-center justify-evenly">
          <div className="space-y-5">
            <h1>
              Share Skills, Build <span>Bonds</span>!
            </h1>
            <p>
              Encouraging acts of service, fostering deeper connections and a
              spirit of collaboration within communities
            </p>
            <button className="p-3">Browse Services</button>
          </div>
          <img src="/your-image.jpg" alt="Placeholder" />{" "}
          {/* Replace with actual image */}
        </div>
        <div>
          <h2>Requests available</h2>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <p>Filter By:</p>
              <select
                className="w-[150px] bg-white text-black px-2 py-1 border rounded-md"
                onChange={handleFilterChange}
                value={selectedRole}
              >
                <option value="all">All</option>
                <option value="try">"try"</option>
                {/* Add options as per your actual roles */}
              </select>
            </div>
            <button className="p-3 bg-green text-white" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
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
