import { useState } from "react";
import watchs from "../assets/watches.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [errors, setErrors] = useState({}); // Track errors per field
  const api = import.meta.env.VITE_URL;

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (!conPassword) {
      newErrors.conPassword = "Please confirm your password";
    }
    if (password && conPassword && password !== conPassword) {
      newErrors.conPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop if validation errors exist
    }

    axios
      .post(
        `${api}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          const serverMessage =
            err.response.data.message || err.response.data.status;
          if (serverMessage && serverMessage.toLowerCase().includes("email")) {
            setErrors((prev) => ({ ...prev, email: serverMessage }));
          } else {
            alert(serverMessage);
          }
        } else {
          alert(err.message);
        }
      });
  };

  return (
    <div>
      <div className="grid grid-cols-[11fr_9fr] h-screen bg-white">
        <div className="flex items-center justify-center font-serif">
          <form className="w-3/5" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-blue-900 py-6">
              Create Account
            </h2>

            {/* Name */}
            <div>
              <label htmlFor="name" className="text-base">
                Name
              </label>
              <br />
              <input
                type="text"
                id="name"
                className={`border text-sm w-full h-9 mb-1 pl-3 rounded-md focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-blue-500"
                }`}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mb-2">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-base">
                Email
              </label>
              <br />
              <input
                type="email"
                id="email"
                className={`border text-sm pl-3 w-full h-9 mb-1 rounded-md focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-blue-500"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mb-2">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-base">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                className={`border text-sm pl-3 block w-full h-9 mb-1 rounded-md focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-blue-500"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mb-2">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="conPassword" className="text-base">
                Confirm Password
              </label>
              <br />
              <input
                type="password"
                id="conPassword"
                className={`border text-sm w-full pl-3 h-9 mb-1 rounded-md focus:outline-none ${
                  errors.conPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-blue-500"
                }`}
                placeholder="Re-enter your password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
              {errors.conPassword && (
                <p className="text-red-600 text-xs mb-2">
                  {errors.conPassword}
                </p>
              )}
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="px-4 py-2 w-full rounded-md mt-1 bg-blue-950 text-white hover:bg-blue-800"
              >
                Create Account
              </button>
            </div>

            <p className="py-1 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
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

export default SignUp;
