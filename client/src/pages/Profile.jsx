import { useState } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import cover from "../assets/cover.jpg";
import girl from "../assets/girl.jpg";

function Profile() {
  // Define state for active tab
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div>
      <LoggedNavbar />
      <div className="min-h-screen text-gray-700 font-serif m-0 bg-slate-100">
        {/* Profile Section */}
        <div className="h-[470px] bg-white relative">
          {/* Background Cover */}
          <div>
            <img src={cover} alt="cover" className="h-80 w-full object-cover" />
          </div>

          {/* Profile Picture */}
          <div className="absolute top-60 left-[10%] transform -translate-x-1/2">
            <img
              src={girl}
              alt="profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="p-4 mt-2 ml-[200px]  md:ml-80">
            <span className="text-2xl font-bold block">Jenisha Gurung</span>
            <span className="block text-gray-500">Part-time chef</span>
          </div>

          {/* Actions (SVG + Buttons) */}
          <div className="flex justify-end items-center gap-4 px-4 absolute top-96 right-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white rounded-full bg-blue-950 h-8 w-8 p-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <button className="px-11 py-1 bg-blue-950 text-white rounded hover:bg-blue-600">
              Follow
            </button>
            <button className="px-3 py-1 border border-blue-950 text-blue-950 rounded hover:bg-blue-600 hover:text-white">
              Appoint a service?
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-12 gap-2 mx-2 my-2">
          {/* About Section */}
          <div className="bg-white p-2 rounded shadow h-[600px] col-span-12 md:col-span-3 px-5">
            <h1 className="text-xl font-bold mb-6 text-blue-900 mt-4">About</h1>
            <ul className="space-y-3">
              <li>
                <strong>Birthday:</strong> January 1, 1995
              </li>
              <li>
                <strong>Gender:</strong> Female
              </li>
              <li>
                <strong>Location:</strong> Kathmandu, Nepal
              </li>
              <li>
                <strong>Email:</strong> jenisha.gurung@example.com
              </li>
              <li>
                <strong>Phone:</strong> +977-9812345678
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-[200px] md:mt-[300px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="text-blue-900 h-6 w-6"
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
              <h4 className="font-semibold text-blue-900 text-lg">
                Settings and Help
              </h4>
            </div>
          </div>

          {/* Column 2 */}
          <div className=" h-[410px] col-span-12 md:col-span-9">
            <div className="grid grid-rows-2 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="text-base font-medium text-center text-gray-500 bg-white p-2 rounded shadow">
                  {/* Tabs Navigation */}
                  <ul className="flex flex-wrap -mb-px  ">
                    <li className="me-2">
                      <button
                        className={`inline-block p-3 ${
                          activeTab === "skills"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("skills")}
                      >
                        Skills
                      </button>
                    </li>
                    <li className="me-2">
                      <button
                        className={`inline-block p-3 ${
                          activeTab === "services"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("services")}
                      >
                        Services
                      </button>
                    </li>
                    <li className="me-2">
                      <button
                        className={`inline-block p-3 ${
                          activeTab === "reviews"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("reviews")}
                      >
                        Reviews
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="mt-5">
                    {activeTab === "skills" && (
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 border border-1 border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white ml-3">
                          Cooking
                        </span>
                        <span className="px-3 py-1 border border-1 border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white">
                          Cleaning
                        </span>
                        <span className="px-3 py-1 border border-1 border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white">
                          Tutoring
                        </span>
                        <span className="px-3 py-1 border border-1 border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white">
                          Aged care
                        </span>
                        <span className="px-3 py-1 border border-1 border-blue-900 text-blue-900 rounded hover:bg-blue-600 hover:text-white">
                          Pet sitting
                        </span>
                      </div>
                    )}
                    {activeTab === "services" && (
                      <div>
                        <p className="text-gray-600">
                          List of services provided.
                        </p>
                      </div>
                    )}
                    {activeTab === "reviews" && (
                      <div>
                        <p className="text-gray-600">
                          User reviews will be shown.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-2 h-full">
                  {/* Row 1: Time Bank with Border */}
                  <div className="border-b-2 border-gray-200 bg-white p-2 rounded shadow">
                    <div className="text-base font-semibold text-blue-900 p-2">
                      Time Bank
                    </div>
                    <div className="flex items-center justify-center h-full relative">
                      <p className="text-5xl font-bold absolute top-[30px] mr-6">
                        10
                        <span className="text-xs font-medium">
                          {" "}
                          TIME CREDITS
                        </span>
                      </p>
                      <button className="px-11 mt-7 py-1 bg-blue-950 text-white rounded hover:bg-blue-600">
                        See Transactions
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Average Rating */}
                  <div className="text-base font-semibold text-blue-900  bg-white p-2 rounded shadow">
                    Average Rating
                  </div>
                  <div className="flex items-center justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-400 w-14 h-auto ml-6 p-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white p-2 rounded shadow h-[410px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
