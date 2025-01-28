import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useParams } from "react-router-dom";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { BiSolidCoinStack } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci"; // Ensure this import exists
import axios from "axios";

export default function RequestDisplay() {
  const { id } = useParams(); // Extract the `id` from the URL params
  const { authToken } = useContext(AuthContext); // Get the authentication token from the context
  const [request, setRequest] = useState(null); // Store the request data
  const [client, setClient] = useState(null); // Store the client data
  const [loading, setLoading] = useState(true); // Handle loading state
  const api = import.meta.env.VITE_URL; // Use the environment variable for the API URL

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchRequestAndClient = async () => {
      try {
        // Fetch request data by ID
        const response = await axios.get(`${api}/user/findServicebyId/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const requestData = response.data.data;
        setRequest(requestData); // Set the request data

        if (requestData && requestData.client) {
          // Extract the client ID if `requestData.client` is an object
          const clientId =
            typeof requestData.client === "object"
              ? requestData.client.id
              : requestData.client;

          const clientResponse = await axios.get(
            `${api}/user/getUser/${clientId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log("Client ID from requestData:", requestData.client);

          setClient(clientResponse.data.data); // Set the client data
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchRequestAndClient(); // Call the async function
  }, [id, authToken, api]); // Add dependencies

  const handleChat = () => {
    console.log("Chat clicked");
  };

  const handleClick = () => {
    console.log("Handle request clicked");
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
        <h1>{request?.title}</h1>
        <div className="flex gap-3">
          <img
            src={`${api}/image/${request?.img}`}
            className="w-1/2"
            alt="Request"
          />
          <div className="border-b-2">
            <div>
              <div className="flex gap-2">
                <BiSolidCoinStack />
                <p>{request?.budget} Time credits</p>
              </div>
              <p>Timeline: {request?.timeframe} days</p>
            </div>
          </div>
          <div>
            <h2>Posted By:</h2>
            <div className="flex gap-3 items-center">
              {client && client.image && (
                <img
                  src={`${api}/image/${client.image}`}
                  className="rounded"
                  alt="Client"
                />
              )}
              <div>
                <h2>{client?.name}</h2>
                <div className="flex gap-2 items-center">
                  <CiLocationOn />
                  <p>
                    {client?.city}, {client?.province}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={handleChat} className="flex gap-3">
              <p>Chat </p>
              <MdOutlineChatBubbleOutline />
            </button>
            <button className="p-3 bg-green" onClick={handleClick}>
              Take this request
            </button>
          </div>
        </div>
        <div className="border-b-2">
          <p>Skills: {request?.skills}</p>
          <h4>Description</h4>
          <p>{request?.description}</p>
        </div>
        <p className="r-0">This offer ends in: {request?.expiration}</p>
      </div>
      <Footer />
    </div>
  );
}
