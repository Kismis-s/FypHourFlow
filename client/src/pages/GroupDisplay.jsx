import { useContext, useEffect, useState } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function GroupDisplay() {
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`${api}/user/getGroupbyId/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Group Data:", res.data);
        setGroup(res.data.group);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };
    fetchGroup();
  }, [id, authToken, api]);

  return (
    <div>
      <LoggedNavbar />
      <div className="bg-slate-100 min-h-screen">
        {group && (
          <div className="text-gray-700 font-serif">
            {/* Header */}
            <div className="relative h-[400px] bg-white md:h-[470px]">
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={`${api}/groupImages/${group.image}`}
                  alt="cover"
                  className="h-60 w-full object-cover md:h-80"
                />
              </div>

              {/* Profile Image */}
              <div className="absolute left-1/2 -translate-x-1/2 top-40 md:left-[17%] md:top-60">
                <img
                  src={`${api}/groupImages/${group.profile}`}
                  alt="profile"
                  className="h-24 w-24 border-4 border-white object-cover md:h-28 md:w-28"
                />
              </div>

              {/* Group Name */}
              <div className="mt-2 ml-4 md:ml-80 md:p-4 text-xl font-bold md:text-2xl">
                {group.name}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-80 flex justify-center gap-2 right-0 p-4 md:top-96 md:right-10">
                <button className="rounded bg-blue-950 px-8 py-1 text-white hover:bg-blue-600 md:px-11">
                  Join
                </button>
                <button className="rounded border border-blue-950 px-8 py-1 text-blue-950 hover:bg-blue-600 hover:text-white md:px-3">
                  Share
                </button>
              </div>
            </div>

            <div className="mx-2 my-2 grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-4 space-y-4">
                {/* About Section */}
                <div className="bg-white rounded p-5 shadow">
                  <h1 className="text-lg font-bold text-blue-900 mb-2">
                    ABOUT
                  </h1>
                  <p className="text-base mb-2">
                    {" "}
                    <span className="text-blue-900 font-semibold">
                      Description:{" "}
                    </span>
                    {group.description}
                  </p>

                  <h2 className="font-semibold mb-1 text-blue-900">
                    Skills Required:
                  </h2>
                  {group.skills && group.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed.</p>
                  )}

                  <h2 className="text-blue-900 font-semibold mt-4 mb-2">
                    Administrator:
                  </h2>
                  {group.creator ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={`${api}/uploads/${group.creator.photo}`}
                        alt="admin"
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                      <p className="text-base">{group.creator.name}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Administrator name not available
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column (Posts) */}
              <div className="col-span-12 md:col-span-8 bg-white rounded p-4 shadow">
                <h1 className="text-xl font-bold text-blue-900 mb-4">Posts</h1>
                {group.posts && group.posts.length > 0 ? (
                  group.posts.map((post, index) => (
                    <div
                      key={index}
                      className="mb-4 border-b pb-2 last:border-none"
                    >
                      <h2 className="text-lg font-semibold">{post.author}</h2>
                      <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No posts available.</p>
                )}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default GroupDisplay;
