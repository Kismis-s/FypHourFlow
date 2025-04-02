import React, { useContext, useState, useEffect } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import RequestCard from "../components/RequestCard";
import OfferCard from "../components/OfferCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import home from "../assets/home.png";
import AchievementSlider from "../components/HighlightsCard";
import kk from "../assets/kk.png";
import miniso from "../assets/miniso.png";
import pathao from "../assets/pathao.png";
import roadhouse from "../assets/roadhouse.png";
import fire from "../assets/fire.png";
import daraz from "../assets/daraz.png";
import arabica from "../assets/arabica.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, offersRes] = await Promise.all([
          axios.get(`${api}/user/getServices`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }),
          axios.get(`${api}/user/getOffers`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }),
        ]);

        // Process services
        const latestServices = servicesRes.data.data
          .filter((service) => service.status !== "Completed")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
          .slice(0, 8); // Limit to 8

        // Process offers
        const latestOffers = offersRes.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
          .slice(0, 8); // Limit to 8

        setServices(latestServices);
        setOffers(latestOffers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, api]);

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
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-primary text-blue-950 leading-10">
              Exchange Skills, Enrich{" "}
              <span className="text-blue-700 ">Communities!</span>!
            </h1>
            <p className="text-lg text-secondary text-gray-500 mt-6 pb-5">
              HourFlow connects people through a time-based service exchange,
              where skills are shared,
              <br /> and connections are built. Contribute your time, receive
              help in return, and foster a culture <br /> of
              collaboration—because every hour counts!
            </p>
          </div>
          <img src={home} alt="Placeholder" className="h-[330px] w-auto pt-8" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-2xl font-semibold text-blue-900 ml-16 font-serif">
            Latest Requests
          </h2>
          <div className="flex justify-between items-center text-blue-900 gap-1 mr-12 hover:text-blue-500">
            <Link to="/services">More</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 ml-16 mt-7 mb-6">
          {services.map((request, index) => (
            <RequestCard request={request} key={index} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-12">
          <h2 className="text-2xl font-semibold text-blue-900 ml-16 font-serif">
            Latest Offers
          </h2>
          <div className="flex justify-between items-center text-blue-900 gap-1 mr-12 hover:text-blue-500">
            <Link to="/offers">More</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 ml-16 mt-7 mb-6 font-serif">
          {offers.map((offer, index) => {
            return <OfferCard offer={offer} key={index} />;
          })}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 ml-16 font-serif mt-12 mb-4">
            HourFlow's Highlights
          </h2>
          <AchievementSlider />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 ml-16 font-serif mb-6">
            Our Top Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-[85px] mb-4">
            <img src={kk} alt="KK mart" className="h-[65px] w-auto" />
            <img src={miniso} alt="Miniso" className="h-[70px] w-auto" />
            <img src={daraz} alt="Daraz" className="h-[70px] w-auto" />
            <img src={pathao} alt="Pathao" className="h-[95px] w-auto" />
            <img src={roadhouse} alt="Roadhouse" className="h-[90px] w-auto" />
            <img src={fire} alt="fire" className="h-[100px] w-auto" />
            <img src={arabica} alt="arabica" className="h-[120px] w-auto" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
