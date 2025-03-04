import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

export default function Reviews() {
  const { userId } = useParams();
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const api = import.meta.env.VITE_URL;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${api}/user/getUser/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.data.status == "success") {
        setUser(res.data.data);
        setLoading(false);
      }
    };
    fetchProfile();
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
      <div className="grid grid-cols-[17%_83%] gap-0 font-serif">
        <div className="text-blue-900 bg-blue-50 pl-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <Link to="/profile">BACK TO PROFILE PAGE</Link>
        </div>
        {user.review.map((review) => {
          return <ReviewCard reviewId={review} key={review}/>; 
        })}
      </div>
      <Footer />
    </div>
  );
}
