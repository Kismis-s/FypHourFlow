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
import PrivateRoute from "./PrivateRouter";
import ServicePage from "../../client/src/pages/ServicePage";
import RequestDisplay from "./pages/RequestDisplay";

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
        <Route
          path="/displayService/:id"
          element={<PrivateRoute element={<RequestDisplay />} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
