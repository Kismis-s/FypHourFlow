import { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Nav from "../components/loggedNavbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_URL;
const socket = io(`${api}`);

const Chat = () => {
  const { authToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const currentUserId = searchParams.get("currentUser");
  const chatWithUserId = searchParams.get("chatUser");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [chatUser, setChatUser] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    const generatedRoomId = [currentUserId, chatWithUserId].sort().join("_");
    setRoomId(generatedRoomId);
    // Start the chat by creating or joining a room
    socket.emit("start_chat", {
      userId1: currentUserId,
      userId2: chatWithUserId,
    });

    // Listen for past messages
    socket.on("past_messages", (pastMessages) => {
      console.log("Received past messages:", pastMessages);
      setMessages(pastMessages); // Set existing messages
    });

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Clean up when component unmounts
    return () => {
      socket.off("past_messages");
      socket.off("receive_message");
    };
  }, [currentUserId, chatWithUserId]);

  useEffect(() => {
    const fetch = async () => {
      const responseCurrent = await axios.get(
        `${api}/user/getUser/${currentUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCurrentUser(responseCurrent.data.data);
      const responseChat = await axios.get(
        `${api}/user/getUser/${chatWithUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setChatUser(responseChat.data.data);
    };
    fetch();
  }, [authToken, api, chatWithUserId, currentUserId]);

  const sendMessage = () => {
    socket.emit("send_message", { roomId, message, senderId: currentUserId });
    setMessage(""); 
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col h-screen w-full max-w-2xl mx-auto border border-grey">
        <header className="p-4 border-b border-grey text-center flex justify-between">
          <h1 className="text-xl font-semibold text-primary">
            Chat with {chatUser ? chatUser.name : ""}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {messages.map((msg, idx) => {
              const isCurrentUser = msg.senderId === currentUserId;
              return (
                <div
                  key={msg._id || idx}
                  className={`rounded-xl py-2 px-4 my-1 max-w-fit  ${
                    isCurrentUser
                      ? "bg-green-500 self-end text-white"
                      : "bg-blue-500 self-start text-white"
                  }`}
                >
                  <span className="m-1"> {msg.message || msg.mediaUrl}</span>
                </div>
              );
            })}
          </div>
        </main>

        <footer className="flex p-4 border-t border-grey">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-grey rounded-md p-2 mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-500 text-white rounded-md px-4 py-2"
          >
            Send
          </button>
        </footer>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
