import { useContext, useEffect, useState } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaImage, FaFileAlt, FaLink } from "react-icons/fa";
import PostCard from "../components/PostCard";
import { FaCheck } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import ShareModal from "../components/ShareModal";
import Swal from "sweetalert2";

function GroupDisplay() {
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);
  const [postImages, setPostImages] = useState(null);
  const [postText, setPostText] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareUrl = window.location.href;
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
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${api}/user/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(res.data.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(res.data.data);
        // Check if the user is a member of the group
        if (res.data.data.groups.includes(id)) {
          setIsMember(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    checkMembership();
  }, [id, authToken, api]);

  const handleJoinGroup = async () => {
    try {
      const res = await axios.put(`${api}/user/joinGroup/${id}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.data.message === "Joined group successfully") {
        setIsMember(true);
        Swal.fire({
          icon: "success",
          title: "You have joined the group!",
          text: "Welcome aboard! Connect, share, and grow together.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
        });
      }
    } catch (error) {
      console.error("Error joining group:", error);
      alert("Failed to join the group!");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const res = await axios.patch(`${api}/user/leaveGroup/${id}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.data.message === "Left group successfully") {
        setIsMember(false);
        Swal.fire({
          icon: "success",
          title: "You have left the group",
          text: "We're sad to see you go!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
        });
      }
    } catch (error) {
      console.error("Error leaving group:", error);
      alert("Failed to leave the group!");
    }
  };

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", postText);
      if (postImages) {
        formData.append("postImages", postImages);
      }

      const response = await axios.post(
        `${api}/user/createPost/${group._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === "Post created successfully") {
        alert("Posted successfully!");
        setPostText("");
        setPostImages(null);

        const updatedGroup = await axios.get(`${api}/user/getGroupbyId/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        setGroup(updatedGroup.data.group);
      }
    } catch (error) {
      console.error("Error posting content:", error);
      alert("Failed to post the content!");
    }
  };

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
                {isMember ? (
                  <button
                    onClick={handleLeaveGroup}
                    className="rounded px-8 py-1 md:px-8 text-red-600 border border-red-600 bg-white  hover:bg-red-700 hover:text-white"
                  >
                    Leave
                  </button>
                ) : (
                  <button
                    onClick={handleJoinGroup}
                    className="rounded py-1 px-10 bg-blue-950 text-white hover:bg-blue-600"
                  >
                    Join
                  </button>
                )}

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="rounded border border-blue-950 px-8 py-1 text-blue-950 hover:bg-blue-600 hover:text-white md:px-5"
                >
                  <FaShareAlt className="inline-block mr-2" />
                  Share
                </button>
                <ShareModal
                  isOpen={isShareModalOpen}
                  onClose={() => setIsShareModalOpen(false)}
                  title="Join our amazing group!"
                  quote="Discover and connect with like-minded individuals in our group."
                  hashtag="#AmazingGroup"
                  shareUrl={shareUrl}
                />
              </div>
            </div>

            <div className="mx-2 my-2 grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-4 space-y-4">
                {/* About Section */}
                <div className="bg-white rounded p-5 shadow">
                  <h1 className="text-lg font-bold text-blue-900 mb-5">
                    ABOUT
                  </h1>
                  <p className="text-base mb-5">
                    {" "}
                    <span className="text-blue-900 font-semibold">
                      Description:{" "}
                    </span>
                    {group.description}
                  </p>

                  <h2 className="font-semibold mb-2 text-blue-900">
                    Skills we're looking for:
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

                  <h2 className="text-blue-900 font-semibold mt-5 mb-2">
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

              {/* Right Column (Create Post + Posts) */}
              <div className="col-span-12 md:col-span-8">
                {/* Create Post */}
                <div className="bg-white rounded shadow-sm p-6">
                  <div className="flex items-start space-x-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`${api}/uploads/${user?.photo}`} // use uploaded photo
                      alt="Your profile"
                    />
                    <div className="flex-1">
                      <p className="font-bold mb-1">{user?.name}</p>
                      <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        rows="3"
                        placeholder="Share an achievement, tip, or ask a question..."
                      ></textarea>
                      {postImages && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(postImages)}
                            alt="Preview"
                            className="h-40 rounded border"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex space-x-4">
                          <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() =>
                              document.getElementById("imageUpload").click()
                            }
                          >
                            <FaImage />
                          </button>
                          <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => setPostImages(e.target.files[0])}
                          />
                          <button className="text-gray-500 hover:text-blue-500">
                            <FaFileAlt />
                          </button>
                          <button className="text-gray-500 hover:text-blue-500">
                            <FaLink />
                          </button>
                        </div>
                        <button
                          onClick={handleCreatePost}
                          className="bg-blue-950 hover:bg-blue-600 text-white px-5 py-1 rounded text-sm font-medium"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts Section */}
                <div className="mt-2 gap-y-4">
                  {group.posts && group.posts.length > 0 ? (
                    <div className="space-y-2">
                      {group.posts.map((post, index) => (
                        <PostCard key={index} post={post} api={api} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No posts available.</p>
                  )}
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

export default GroupDisplay;
