import watchs from "../assets/watches.jpg";
import { useState } from "react";
import { useContext } from "react";
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

    try {
      const response = await axios.post(
        `${api}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === "Logged in!") {
        login(response.data.accessToken);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(` ${error.response?.data?.msg || "error occured"} `);
    }
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
              <br></br>
              <input
                type="text"
                id="email"
                className="border border-gray-400 text-gray-500 text-sm pl-3 w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="pw" className="text-base">
                Password
              </label>
              <br></br>
              <input
                type="password"
                id="pw"
                className="border border-gray-400 text-gray-500 text-sm pl-3 block w-full h-9 mb-4 rounded-md focus:border-blue-500 focus:border-2 focus:outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button
                className="px-4 py-2 w-full rounded-md mt-7 bg-blue-950 text-white hover:bg-blue-800"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <p className="py-2 text-sm text-gray-500">
                Don't have an account?{" "}
                <span className="text-blue-600">Sign Up</span>
              </p>
              <p className="py-2 text-sm text-blue-600 text-right">
                Forgot password?
              </p>
            </div>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button className="flex items-center justify-center px-4 py-2 w-full rounded-md mt-8 text-gray-500 border border-gray-400 transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Continue with Google
            </button>
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
