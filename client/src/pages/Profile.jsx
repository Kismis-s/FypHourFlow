import { useContext, useEffect, useState } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Badge from "../components/AchievementBadges";
function Profile() {
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("skills");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${api}/user/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(res.data.data);
    };
    fetchProfile();
  }, []);
  const handleReviewClick = () => {
    navigate(`/reviews/${user._id}`);
  };
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <LoggedNavbar />
      <div className="bg-slate-100">
        {user && (
          <div className="min-h-screen text-gray-700 font-serif">
            {/* Profile Header */}
            <div className="relative h-[400px]  bg-white md:h-[470px]">
              {/* Background Cover */}
              <div className="relative">
                <img
                  src={`${api}/uploads/${user.cover}`}
                  alt="cover"
                  className="h-60 w-full object-cover md:h-80"
                />
              </div>
              {/* Profile Picture */}
              <div className="absolute left-1/2 -translate-x-1/2 top-40 md:left-[17%] md:top-60">
                <img
                  src={`${api}/uploads/${user.photo}`}
                  alt="profile"
                  className="h-24 w-24 rounded-full border-4 border-white object-cover md:h-28 md:w-28"
                />
              </div>
              {/* Profile Info */}
              <div className="mt-2 ml-4  md:ml-80 md:p-4 flex flex-col items-center md:items-start">
                <span className="text-xl font-bold  block md:text-2xl">
                  {user.name}
                </span>
                <span className="block text-gray-500">
                  {user.profession ? user.profession : ""}
                </span>
              </div>
              {/* Actions (SVG + Buttons) */}
              <div className="absolute top-80 flex justify-center gap-2 right-0 p-4 md:top-96 md:right-10 md:justify-end">
                <button className="rounded bg-blue-950 px-8 py-1 text-white hover:bg-blue-600 md:px-11">
                  Follow
                </button>
                <button className="rounded border border-blue-950 px-2 py-1 text-blue-950 hover:bg-blue-600 hover:text-white md:px-3">
                  Appoint a service?
                </button>
              </div>
            </div>
            {/* Grid Section */}
            <div className="mx-2 my-2 grid grid-cols-12 gap-2">
              {/* About Section */}
              <div className="col-span-12  rounded bg-white p-2 shadow md:col-span-3">
                <div className="grid grid-rows-2 h-full gap-4 justify-between ">
                  <div>
                    <h1 className="mt-4 mb-6 text-xl font-bold text-blue-900">
                      About
                    </h1>
                    <ul className="space-y-3">
                      {user.birthday && (
                        <li>
                          <strong>Birthday:</strong> {user.birthday}
                        </li>
                      )}
                      {user.location.city && (
                        <li>
                          <strong>City:</strong> {user.location.city}
                        </li>
                      )}
                      {user.location.country && (
                        <li>
                          <strong>Country:</strong> {user.location.country}
                        </li>
                      )}
                      <li>
                        <strong>Email:</strong> {user.email}
                      </li>
                      {user.phone && (
                        <li>
                          <strong>Phone:</strong> {user.phone}
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="mt-16 flex items-center gap-2 md:mt-[200px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-6 w-6 text-blue-900"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <Link
                      to="/settings"
                      className="text-lg font-semibold text-blue-900"
                    >
                      Settings and More
                    </Link>
                  </div>
                </div>
              </div>
              {/* Column 2 */}
              <div className="col-span-12 md:col-span-9">
                <div className="grid  h-full grid-rows-1 md:grid-rows-2 gap-2">
                  {/* Tab Container */}
                  <div className="grid grid-cols-1  md:grid-cols-2  gap-2">
                    <div className="rounded bg-white p-2 shadow text-center text-base font-medium text-gray-500">
                      {/* Tabs Navigation */}
                      <ul className="flex flex-wrap -mb-px">
                        <li className="me-2">
                          <button
                            className={`inline-block p-3 ${
                              activeTab === "skills"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "border-transparent hover:border-gray-300 hover:text-gray-600"
                            }`}
                            onClick={() => setActiveTab("skills")}
                          >
                            Skills
                          </button>
                        </li>
                      </ul>
                      {/* Tab Content */}
                      <div className="mt-5">
                        {activeTab === "skills" && (
                          <div className="flex flex-wrap gap-3">
                            {user.skills?.length > 0
                              ? user.skills.map((skill, index) => {
                                  return (
                                    <span
                                      className="rounded border border-1 border-blue-900 px-3 py-1 text-blue-900 hover:bg-blue-600 hover:text-white"
                                      key={index}
                                    >
                                      {skill}
                                    </span>
                                  );
                                })
                              : "No skills yet"}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Right Side Section */}
                    <div className="grid grid-rows-2 h-full gap-2 ">
                      {/* Time Bank */}
                      <div className="relative flex h-full flex-col justify-between rounded bg-white p-2 shadow border-b-2 border-gray-200">
                        <div className="p-2 text-base font-semibold text-blue-900">
                          Time Bank
                        </div>
                        <div className="flex h-full flex-col items-center justify-center">
                          <p className="text-5xl font-bold ">
                            {user.balance}
                            <span className="text-xs font-medium">
                              {" "}
                              TIME CREDITS
                            </span>
                          </p>
                          <Link
                            to="/transactions"
                            className="mt-7 rounded bg-blue-950 px-8 py-1 text-white hover:bg-blue-600"
                          >
                            See Transactions
                          </Link>
                        </div>
                      </div>
                      {/* Average Rating */}
                      <div className="flex h-full items-center justify-center rounded bg-white p-2 shadow flex-col">
                        <div className="text-base font-semibold text-blue-900">
                          Average Rating
                        </div>
                        <div className="mt-4 text-center text-3xl items-center justify-center">
                          {generateStars(user.averageRating)}
                          {/* <br></br>
                          {user.averageRating} */}
                        </div>
                        <button
                          onClick={handleReviewClick}
                          className="mt-7 rounded bg-blue-950 px-11 py-1 text-white hover:bg-blue-600"
                        >
                          See Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Display Achievement Badges */}
                  <div className="rounded bg-white h-full shadow">
                    <h2 className="text-base font-semibold text-blue-900 p-5">
                      Achievement Badges
                    </h2>
                    <div className="grid gap-4">
                      {user.achievementBadges?.length > 0 ? (
                        user.achievementBadges.map((badge) => (
                          <Badge key={badge._id} badge={badge} />
                        ))
                      ) : (
                        <p className="text-center">No Achievements yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
