import React, { useContext, useState, useEffect } from "react";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import groupsImg from "../assets/groupsImg.jpg";
import GroupCard from "../components/GroupCard";

const Groups = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await axios.get(`${api}/user/groups`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setGroups(res.data.groups);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, [authToken, api]);

  const handleCreate = () => {
    navigate("/createGroup");
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
          <img src={groupsImg} alt="Placeholder" className="h-[380px] w-auto" />
        </div>
        <div className="flex justify-between items-center mt-6 font-serif">
          <h2 className="text-2xl font-semibold text-blue-900 ml-16">
            Groups For You
          </h2>
          <button
            className="px-4 py-1 mr-10 bg-green-700 text-white rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <div className="flex flex-wrap gap-5 m-7 font-serif">
          {Array.isArray(groups) && groups.length > 0 ? (
            groups.map((group, index) => (
              <GroupCard group={group} key={index} />
            ))
          ) : (
            <p className="text-gray-600 ml-7">No groups found.</p>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Groups;
