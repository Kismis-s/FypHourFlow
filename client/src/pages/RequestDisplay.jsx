import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useParams } from "react-router-dom";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { BiSolidCoinStack } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
export default function RequestDisplay() {
  const id = useParams();
  const { authToken } = useContext(AuthContext);
  const { request, setRequest } = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const response = await axios.get(`${api}/getServiceById/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    setRequest(response.data.data);
    const res = await axios.get(`${api}/getUserById/${request.client}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    setClient(res.data.data);
    setLoading(false);
  }, []);
  const handleChat = () => {
    console.log("chat clicked");
  };
  const handleClick = () => {
    console.log("handle request clicked");
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
      ?
      <LoggedNavbar />
      <div>
        <h1>{request.title}</h1>
        <div className="flex gap-3">
          <img src={`${api}/image/${request.img}`} className="w-1/2" />
          <div className="border-b-2">
            <div>
              <div className="flex gap-2">
                <BiSolidCoinStack />
                <p>{request.budget} Time credits</p>
              </div>
              <p>Timeline: {request.timeframe} days</p>
            </div>
          </div>
          <div>
            <h2>Posted By:</h2>
            <div className="flex gap-3 items-center">
              <img src={`${api}/image/${client.image}`} className="rounded" />
              <div>
                <h2>{client.name}</h2>
                <div className="flex gap-2 items-center">
                  <CiLocationOn />
                  <p>
                    {client.city},{client.province}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={handleChat} className="flex gap-3">
              <p>Chat </p>
              <MdOutlineChatBubbleOutline />
            </button>
            <button className="p-3 bg-green " onClick={handleClick}>
              Take this request
            </button>
          </div>
        </div>
        <div className="border-b-2">
          <p>Skiils: {request.skills}</p>
          <h4>Description</h4>
          <p>{request.description}</p>
        </div>
        <p className="r-0">This offers ends in: {request.expire}</p>
      </div>
      <Footer />
    </div>
  );
}
