import LandingPage from "./pages/LandingPage";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OffersPage from "./pages/OffersPage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import ServicePage from "./pages/ServicePage";
import Service from "./pages/Service";
import PrivateRoute from "./PrivateRouter";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {" "}
        {/* Define the routes inside this */}
        <Route path="/" element={<LandingPage />} /> {/* Default route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/offers"
          element={<PrivateRoute element={<OffersPage />} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Settings />} />}
        />
        <Route
          path="/transactions"
          element={<PrivateRoute element={<Transactions />} />}
        />
        <Route
          path="/services"
          element={<PrivateRoute element={<ServicePage />} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
