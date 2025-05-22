import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Transactions() {
  const [activeScreen, setActiveScreen] = useState("screen1"); // screen1 = Send Credits now
  const { authToken } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTransactions(res.data.transac || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();

    // Check URL hash for screen, default now screen1 (Send Credits)
    const hash = window.location.hash;
    if (hash === "#screen2") {
      setActiveScreen("screen2"); // Recent Transactions
    } else {
      setActiveScreen("screen1"); // Send Credits
    }
  }, [authToken, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${api}/user/sendCredits`,
        { receiverEmail, amount, remarks },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === "Credits sent successfully!") {
        Swal.fire("Success!", "Credits sent successfully!", "success");

        // Clear input fields
        setReceiverEmail("");
        setAmount("");
        setRemarks("");
        setError(null);

        // Switch to Recent Transactions screen
        setActiveScreen("screen2");
        navigate("/transactions#screen2");

        // Refetch transactions to update UI
        const res = await axios.get(`${api}/user/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTransactions(res.data.transac || []);
      }
    } catch (error) {
      console.log(error);
      setError(` ${error.response?.data?.msg || "error occurred"} `);
    }
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
      <div className="grid grid-cols-[17%_83%] gap-0 font-serif ">
        {/* Sidebar with Back to Profile link at top */}
        <div className="text-blue-900 bg-blue-50 pl-4 pt-3 flex flex-col gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:underline text-blue-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            BACK TO PROFILE PAGE
          </Link>
        </div>

        {/* Main content */}
        <div className="p-4">
          <div className="flex space-x-4 border-b mb-4">
            <button
              className={`py-2 px-4 ${
                activeScreen === "screen1"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveScreen("screen1")}
            >
              Send Credits
            </button>
            <button
              className={`py-2 px-4 ${
                activeScreen === "screen2"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveScreen("screen2")}
            >
              Recent Transactions
            </button>
          </div>

          <div className="mt-4">
            {activeScreen === "screen1" && (
              <div className="flex items-center justify-center font-serif">
                <form className="w-[40%]">
                  <h2 className="text-3xl font-bold text-blue-900 py-6">
                    Send Credits
                  </h2>
                  <div>
                    <label htmlFor="receiverEmail" className="text-base">
                      Receiver's Email
                    </label>
                    <br />
                    <input
                      type="text"
                      id="receiverEmail"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Enter receiver's email"
                      onChange={(e) => setReceiverEmail(e.target.value)}
                      value={receiverEmail}
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="text-base">
                      Amount
                    </label>
                    <br />
                    <input
                      type="number"
                      id="amount"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 block w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Enter the amount"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                  <div>
                    <label htmlFor="remarks" className="text-base">
                      Remarks
                    </label>
                    <br />
                    <input
                      type="text"
                      id="remarks"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Remarks must be longer than 3 characters"
                      onChange={(e) => setRemarks(e.target.value)}
                      value={remarks}
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 mb-2 text-sm font-semibold">
                      {error}
                    </p>
                  )}
                  <button
                    className="px-4 py-2 w-full rounded-md mt-4 bg-blue-950 text-white hover:bg-blue-800 mb-4"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {activeScreen === "screen2" && (
              <div className="pl-4">
                <h2 className="text-lg font-semibold text-blue-900 ">
                  Recent Transactions
                </h2>
                <div>
                  {transactions.length > 0 ? (
                    transactions.slice(0, 7).map((transaction) => (
                      <div
                        key={transaction._id}
                        className="bg-white p-4 mb-4 rounded-md shadow-md hover:shadow-xl transition duration-300"
                      >
                        <p className="text-base text-gray-700">
                          <strong>Amount:</strong> {transaction.amount}
                        </p>
                        <p className="text-base text-gray-700">
                          <strong>Remarks:</strong> {transaction.remarks}
                        </p>
                        <p className="text-base text-gray-700">
                          <strong>Transaction Type:</strong>{" "}
                          {transaction.transaction_type}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-gray-600">
                            Sent to:{" "}
                            <span className="font-semibold">
                              {transaction.receiver?.name || "N/A"}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Received by:{" "}
                            <span className="font-semibold">
                              {transaction.sender?.name || "N/A"}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No transactions available.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
