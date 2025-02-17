import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import OfferCard from "../components/OfferCard";
import OfferBanner from "../components/OfferBanner";
import PopularCategories from "../components/PopularCategories";

export default function OffersPage() {
  const { authToken } = useContext(AuthContext);
  const [topOffers, setTopOffers] = useState([]);
  const [offersNearYou, setOffersNearYou] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await axios.get(`${api}/offers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    setTopOffers(res.data.topOffers);
    setOffersNearYou(res.data.offersNearYou);
    setCategories(res.data.categories);
    setVendors(res.data.vendors);
    setBanners(res.data.banners);
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <LoggedNavbar />
      <div>
        <div className="flex itmes-center justify-evenly">
          <div className="space-y-5">
            <h1>
              Get exclusive <span>discounts</span>!
            </h1>
            <p>Discoutns and offers</p>
            <button className="p-3">Claim your Discounts</button>
          </div>
          <img src="" />
        </div>
        {/* Top Offers */}
        <div>
          <div className="flex jsutify-between">
            <h2>Top Offers</h2>
            <p>More</p>
          </div>
          {topOffers.map((offer, index) => {
            return <OfferCard offer={offer} key={index} />;
          })}
        </div>
        {/* Offers near you */}
        <div>
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
        <div>
          <div className="flex jsutify-between">
            <h2>Popular Categories</h2>
            <p>More</p>
          </div>
          {categories.map((category, index) => {
            return <PopularCategories category={category} key={index} />;
          })}
        </div>
        {/* Top Vendors */}
        <div>
          <h2>Top vendors</h2>
          <div>
            {vendors.map((vendor, index) => {
              return <img src={`${api}/image/${vendor.image}`} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
