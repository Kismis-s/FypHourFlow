import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes> {/* Define the routes inside this */}
        <Route exact path="/" element={<LandingPage />} /> {/* Default route */}
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
