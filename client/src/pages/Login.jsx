import watchs from "../assets/watches.jpg";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const navigate = useNavigate();
  const api = import.meta.env.VITE_URL;
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "", general: "" });

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post(
            `${api}/user/login`,
            {
              email,
              password,
              coords: { latitude, longitude },
              rememberMe,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.status === "Logged in!") {
            login(response.data.accessToken, response.data.id);
            navigate("/home");
          }
        } catch (error) {
          const message = error.response?.data?.message || "Error occurred";

          if (message.toLowerCase().includes("email")) {
            setErrors((prev) => ({ ...prev, email: message, general: "" }));
          } else if (message.toLowerCase().includes("password")) {
            setErrors((prev) => ({ ...prev, password: message, general: "" }));
          } else {
            setErrors((prev) => ({ ...prev, general: message }));
          }
        }
      },
      (err) => {
        setErrors({
          email: "",
          password: "",
          general: "Failed to get your location.",
        });
      }
    );
  };

  return (
    <div>
      <div className="grid grid-cols-[11fr_9fr] h-screen bg-white">
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
                className={`border text-sm pl-3 w-full h-9 mb-1 rounded-md focus:outline-none ${
                  errors.email
                    ? "border-red-600"
                    : "border-gray-400 focus:border-blue-500 focus:border-2"
                } text-gray-500`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mb-3">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="pw" className="text-base">
                Password
              </label>
              <br />
              <input
                type="password"
                id="pw"
                className={`border text-sm pl-3 block w-full h-9 mb-1 rounded-md focus:outline-none ${
                  errors.password
                    ? "border-red-600"
                    : "border-gray-400 focus:border-blue-500 focus:border-2"
                } text-gray-500`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mb-3">{errors.password}</p>
              )}
            </div>

            <div className="mb-5 flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-500 select-none cursor-pointer mt-1"
              >
                Remember me
              </label>
            </div>

            {errors.general && (
              <p className="text-red-600 text-xs mb-3">{errors.general}</p>
            )}

            <div>
              <button
                className="px-4 py-2 w-full rounded-md mt-5 bg-blue-950 text-white hover:bg-blue-800"
                onClick={handleSubmit}
                type="submit"
              >
                Login
              </button>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-700 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>

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
