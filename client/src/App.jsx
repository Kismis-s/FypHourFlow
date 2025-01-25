import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OffersPage from "./pages/OffersPage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {" "}
          {/* Define the routes inside this */}
          <Route exact path="/" element={<LandingPage />} />{" "}
          {/* Default route */}
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/offers" element={<OffersPage />} />
          <Route exact path="/settings" element={<Settings />}/>
          <Route exact path="/transactions" element={<Transactions />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
