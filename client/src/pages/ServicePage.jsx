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
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          distance: selectedDistance !== "all" ? selectedDistance : null,
          status: selectedStatus !== "all" ? selectedStatus : null,
        };

        const res = await axios.get(`${api}/user/getServices`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          params,
        });

        const filtered = res.data.data.filter(
          (service) => service.status === "Open"
        );
        setServices(filtered);
        setFilteredServices(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, selectedDistance, selectedStatus]);

  const handleCreate = () => {
    navigate("/postRequest");
  };

  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.skills?.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredServices(filtered);
    }
  };

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
        <div className="flex items-center justify-evenly font-serif space-x-40 mt-5">
          <div className="space-y-2 ml-[-20px]">
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
          <img src={service} alt="Placeholder" className="h-80 w-auto" />
        </div>

        <div className="flex justify-between items-center mt-6 px-8 ">
          <h2 className="text-2xl font-semibold text-blue-900 font-serif ml-7">
            Requests available
          </h2>

          <div className="flex gap-5 font-serif items-center mr-11">
            {/* Distance Filter */}
            <div className="flex gap-2 items-center">
              <p>Filter By Distance:</p>
              <select
                className="w-[150px] bg-white text-black px-2 py-1 border border-gray-300 rounded-md"
                onChange={handleDistanceChange}
                value={selectedDistance}
              >
                <option value="all">All</option>
                <option value="500">Within 500 meters</option>
                <option value="1000">Within 1 km</option>
                <option value="5000">Within 5 km</option>
              </select>
            </div>

            {/* Search Bar */}
            <form className="relative h-[30px] w-52" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by skill..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full h-full px-3 pr-10 py-2 placeholder-gray-500 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </form>

            <button
              className="px-4 py-1 bg-green-700 text-white rounded"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>

        <div className="px-16">
          <div className="flex flex-wrap gap-9 mt-7 mb-6">
            {services.map((request, index) => (
              <RequestCard request={request} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
