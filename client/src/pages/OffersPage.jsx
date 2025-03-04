import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import OfferCard from "../components/OfferCard";
import OfferBanner from "../components/OfferBanner";
import PopularCategories from "../components/PopularCategories";
import discounts from "../assets/discounts.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OffersPage() {
  const { authToken } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await axios.get(`${api}/user/getOffers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setOffers(res.data.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, [authToken, api]); 
  
  if (loading) {
    return (
      <div className="flex items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  const handleCreate =()=>{
    navigate("/createOffer");
  }
  return (
    <div>
      <LoggedNavbar />
      <div>
        <div className="flex justify-evenly font-serif">
          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold text-primary text-blue-950 ml-1 mt-28 leading-10">
              Get exclusive <span className="text-blue-700">discounts</span>!
            </h1>
            <p className="text-lg text-secondary text-gray-500 pb-3">
              Discounts and Offers!!!
            </p>
            <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700">
              Claim your Discounts
            </button>
          </div>
          <img src={discounts} alt="Discount Offers" className="ml-10" />

        </div>
        {/* Top Offers */}
        <div>
          <div className="flex justify-between items-center px-6 md:px-10 py-4">
            <h2 className="text-2xl font-semibold text-blue-900 font-serif">
              Top Offers
            </h2>
            <button className="px-4 py-1 font-serif bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleCreate}>
              Create
            </button>
          </div>

          <div className="flex flex-wrap gap-5 m-7 font-serif">
            {offers.map((offer, index) => {
              return <OfferCard offer={offer} key={index} />;
            })}
          </div>
        </div>
        {/* Offers near you */}
        {/* <div>
          <div className="flex jsutify-between">
            <h2>Offers near you</h2>
            <p>More</p>
          </div>
          <div>
            {banners.map((banner, index) => {
              return <OfferBanner banner={banner} key={index} />;
            })}
          </div>
          <div>
            {offersNearYou.map((offer, index) => {
              return <OfferCard offer={offer} key={index} />;
            })}
          </div>
        </div>
        {/* Popular Categories */}
        {/* <div>
          <div className="flex jsutify-between">
            <h2>Popular Categories</h2>
            <p>More</p>
          </div>
          {categories.map((category, index) => {
            return <PopularCategories category={category} key={index} />;
          })}
        </div>*/}
        {/* Top Vendors */}
        {/* <div>
          <h2>Top vendors</h2>
          <div>
            {vendors.map((vendor, index) => {
              return <img src={`${api}/image/${vendor.image}`} />;
            })}
          </div>
        </div>  */}
      </div>
      <Footer />
    </div>
  );
}
