import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { BiSolidCoinStack } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

export default function RequestDisplay() {
  const { reqId } = useParams();
  const { authToken, id } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchRequestAndClient = async () => {
      try {
        const response = await axios.get(
          `${api}/user/findServicebyId/${reqId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const requestData = response.data.data;
        console.log(requestData);
        setRequest(requestData);

        if (requestData && requestData.client) {
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

          setClient(clientResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestAndClient();
  }, [reqId, authToken, api]);

  const handleChat = () => {
    navigate(`/chat?currentUser=${id}&chatUser=${client._id}`);
  };
  const handleChatWithProvider = () => {
    navigate(`/chat?currentUser=${id}&chatUser=${request.provider._id}`);
  };
  const handleTakeRequest = async () => {
    setIsRequesting(true);

    try {
      const response = await axios.post(
        `${api}/user/acceptRequest/${reqId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === "Service accepted successfully!") {
        setRequest((prevRequest) => ({
          ...prevRequest,
          status: "In Progress",
          provider: response.data.userInfo._id,
        }));
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <LoggedNavbar />
      <div className="w-full p-6 bg-white shadow-md rounded-lg font-serif">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">REQUEST</h2>
        <h1 className="text-3xl font-bold mb-4">{request?.title}</h1>
        <div className="flex gap-6">
          <img
            src={`${api}/serviceImages/${request?.serviceImage}`}
            className="w-4/5 h-[480px] rounded-lg object-cover"
            alt="Request"
          />
          <div className="w-1/2 flex flex-col">
            {/* Credits Section */}
            <div className="p-4 border-b border-gray-300 flex flex-col items-center">
              <div className="flex items-center gap-2 m-12">
                <BiSolidCoinStack className="text-yellow-500 text-5xl" />
                <p className="text-sm">
                  <span className="text-5xl font-semibold">
                    {request?.credits}
                  </span>{" "}
                  TIME CREDITS
                </p>
              </div>
              <p className="text-gray-600 text-sm self-end mb-2">
                Timeline: {request?.timeline}
              </p>
            </div>

            {/* Posted By Section */}
            <div className="flex-grow flex flex-col justify-center mt-[-6]">
              <h2 className="text-base font-semibold mb-2 text-blue-800">
                POSTED BY:
              </h2>
              <div className="flex items-center gap-3 mb-2 ml-6">
                {client && client.photo && (
                  <img
                    src={`${api}/uploads/${client.photo}`}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Client"
                  />
                )}
                <div>
                  <h2 className="text-base font-semibold">{client?.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CiLocationOn className="text-xl" />
                    <p>
                      {client?.city}, {client?.province}
                    </p>
                  </div>
                </div>
              </div>

              {id != client._id && (
                <button
                  onClick={handleChat}
                  className="flex items-center gap-2 rounded-lg w-full ml-6 mt-4 mb-6"
                >
                  <MdOutlineChatBubbleOutline className="text-xl" /> Chat with{" "}
                  {client?.name}
                </button>
              )}
              {id == client._id && (
                <button
                  onClick={handleChatWithProvider}
                  className="flex items-center gap-2 rounded-lg w-full ml-6 mt-4 mb-6"
                >
                  <MdOutlineChatBubbleOutline className="text-xl" /> Chat with
                  provider
                </button>
              )}
              <button
                onClick={() => setIsOpen(true)}
                className="bg-green-700 text-white w-52 px-6 py-2 rounded-lg hover:bg-green-800 transition ml-6"
              >
                Take This Request
              </button>
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-auto h-40">
                    <h2 className="text-xl font-bold mb-4">
                      Do you want to take this request?
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
                        onClick={handleTakeRequest}
                        disabled={isRequesting}
                      >
                        {isRequesting ? "Processing..." : "Accept"}
                      </button>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4">
          <p className="text-lg font-semibold text-blue-800 mb-1">SKILLS:</p>
          <p className="text-gray-700">{request?.skills.join(", ")}</p>
          <h4 className="text-xl font-semibold mt-4 text-blue-800 mb-1">
            DESCRIPTION:
          </h4>
          <p className="text-gray-700">{request?.description}</p>
        </div>
        <p className="text-gray-600 mt-4 p-4 border-t-2 text-end">
          This request expires in {request?.expiration}
        </p>
      </div>
      <Footer />
    </div>
  );
}
