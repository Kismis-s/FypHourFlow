import React, { useContext, useState, useEffect } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import groups from "../assets/groups.jpg";

const Groups = () => {
  //   const navigate = useNavigate();
  //   const { authToken } = useContext(AuthContext);
  //   const [groups, setGroups] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const api = import.meta.env.VITE_URL;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const [servicesRes, offersRes] = await Promise.all([
  //           axios.get(`${api}/user/getServices`, {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${authToken}`,
  //             },
  //           }),
  //           axios.get(`${api}/user/getOffers`, {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${authToken}`,
  //             },
  //           }),
  //         ]);

  //         // Process services
  //         const latestServices = servicesRes.data.data
  //           .filter((service) => service.status !== "Completed")
  //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
  //           .slice(0, 8); // Limit to 8

  //         // Process offers
  //         const latestOffers = offersRes.data.data
  //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
  //           .slice(0, 8); // Limit to 8

  //         setServices(latestServices);
  //         setOffers(latestOffers);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [authToken, api]);

  //   if (loading) {
  //     return (
  //       <div className="flex items-center h-screen justify-center">
  //         <p>Loading...</p>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <LoggedNavbar />
      <div>
        <div className="flex items-center justify-evenly gap-3 font-serif">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-primary text-blue-950 leading-10 pb-2">
              Build Together, Grow Together <br></br>with
              <span className="text-blue-700"> HourFlow</span>!
            </h1>
            <p className="text-lg text-secondary text-gray-500 mt-6 pb-5">
              HourFlow empowers communities through collective effort and shared
              time.
              <br /> Collaborate, support one another, and strengthen
              bonds—because progress
              <br /> is a team effort, and every hour makes a difference!
            </p>
          </div>
          <img
            src={groups}
            alt="Placeholder"
            className="h-[380px] w-auto"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-2xl font-semibold text-blue-900 ml-16 font-serif">
            Groups For You
          </h2>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Groups;
