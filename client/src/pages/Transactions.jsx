import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import LoggedNavbar from "../components/loggedNavbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const [activeScreen, setActiveScreen] = useState("screen1");
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
  }, []);

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
      console.log(response);
      if (response.data.status === "Credits sent successfully!") {
        alert("Credits sent sucessfully!!!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      setError(` ${error.response?.data?.msg || "error occured"} `);
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
      <div className="grid grid-cols-[17%_83%] gap-0 font-serif">
        <div className="text-blue-900 bg-blue-50 pl-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <Link to="/profile">BACK TO PROFILE PAGE</Link>
        </div>

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
              Transactions
            </button>
            <button
              className={`py-2 px-4 ${
                activeScreen === "screen2"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveScreen("screen2")}
            >
              Send Credits
            </button>
          </div>

          <div className="mt-4">
            {activeScreen === "screen1" && (
              <div className="pl-4">
                <h2 className="text-lg font-semibold text-blue-900 ">
                  Recent Transactions
                </h2>
                <div>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
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

            {activeScreen === "screen2" && (
              <div className="flex items-center justify-center font-serif">
                <form className="w-[40%]">
                  <h2 className="text-3xl font-bold text-blue-900 py-6">
                    Send Credits
                  </h2>
                  <div>
                    <label htmlFor="receiverEmail" className="text-base">
                      Receiver's Email
                    </label>
                    <br></br>
                    <input
                      type="text"
                      id="receiverEmail"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Enter receiver's email"
                      onChange={(e) => setReceiverEmail(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="amount" className="text-base">
                      Amount
                    </label>
                    <br></br>
                    <input
                      type="amount"
                      id="amount"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 block w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Enter the amount"
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="remarks" className="text-base">
                      Remarks
                    </label>
                    <br></br>
                    <input
                      type="text"
                      id="remarks"
                      className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                      placeholder="Remarks must be longer than 3 characters"
                      onChange={(e) => setRemarks(e.target.value)}
                    ></input>
                  </div>
                  <button
                    className="px-4 py-2 w-full rounded-md mt-4 bg-blue-950 text-white hover:bg-blue-800 mb-4"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
