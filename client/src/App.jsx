import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes> {/* Define the routes inside this */}
        <Route exact path="/" element={<LandingPage />} /> {/* Default route */}
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
