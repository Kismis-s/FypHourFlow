import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import RequestCard from "../components/RequestCard";
import { useNavigate } from "react-router-dom";
export default function ServicePage() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await axios.get(`${api}/services`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    setServices(res.data.data);
    setLoading(false);
  }, []);
  const handleCreate = () => {
    navigate("/createService");
  };
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
              Share Skills, Build <span>Bonds</span>!
            </h1>
            <p>
              Encouraging acts of service, fostering deeper connections and a
              spirit of collaboration within communities
            </p>
            <button className="p-3">Browse Services</button>
          </div>
          <img src="" />
        </div>
        <div>
          <h2>Requests available</h2>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <p>Filter By:</p>
              <select
                className="w-[150px] bg-white text-black px-2 py-1 border rounded-md"
                onChange={handleFilterChange}
                value={selectedRole}
              >
                <option value="all">All</option>
                <option value="try">"try"</option>
              </select>
            </div>
            <button className="p-3 bg-green text-white" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
        {services.map((request, index) => {
          return <RequestCard request={request} key={index} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
