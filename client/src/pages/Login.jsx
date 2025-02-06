import watchs from "../assets/watches.jpg";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const api = import.meta.env.VITE_URL;
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        try {
          const response = await axios.post(
            `${api}/user/login`,
            {
              email,
              password,
              coords: { latitude, longitude },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Sending coordinates:", { latitude, longitude });

          if (response.data.status === "Logged in!") {
            login(response.data.accessToken);
            navigate("/profile");
          }
        } catch (error) {
          console.log(error);
          setError(`${error.response?.data?.message || "Error occurred"}`);
        }
      },
      (err) => {
        console.error(err);
        setError("Failed to get your location.");
      }
    );
  };

  return (
    <div>
      <div className="grid grid-cols-[11fr_9fr] h-screen bg-white">
        {/* Left Form Section */}
        <div className="flex items-center justify-center font-serif">
          <form className="w-3/5">
            <h2 className="text-3xl font-bold text-blue-900 py-6">Login</h2>
            <div>
              <label htmlFor="email" className="text-base">
                Email
              </label>
              <br />
              <input
                type="text"
                id="email"
                className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pw" className="text-base">
                Password
              </label>
              <br />
              <input
                type="password"
                id="pw"
                className="border border-gray-400 text-gray-500 text-sm pl-3 block w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 w-full rounded-md mt-7 bg-blue-950 text-white hover:bg-blue-800"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Right Image Section */}
        <div>
          <img
            src={watchs}
            alt="login/signup pic"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
