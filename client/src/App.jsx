import LandingPage from "./pages/LandingPage";
import {
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
import PostService from "./pages/CreateRequest";
import UserServices from "./pages/UserServices";
import EditService from "./pages/EditService";
import OpenServices from "./pages/OpenServices";
import OngoingServices from "./pages/OngoingServices";
import Chat from "./pages/Chats";
import CreateOffer from "./pages/CreateOffer";
import EditOffer from "./pages/EditOffer";
import Reviews from "./pages/Reviews";
import HomePage from "./pages/Home";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import GroupDisplay from "./pages/GroupDisplay";
import ContactUs from "./pages/ContactUs";

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
          path="/displayService/:reqId"
          element={<PrivateRoute element={<RequestDisplay />} />}
        />
        <Route
          path="/postRequest"
          element={<PrivateRoute element={<PostService />} />}
        />
        <Route
          path="/userServices"
          element={<PrivateRoute element={<UserServices />} />}
        />
        <Route
          path="/editService/:id"
          element={<PrivateRoute element={<EditService />} />}
        />
        <Route
          path="/openServices"
          element={<PrivateRoute element={<OpenServices />} />}
        />
        <Route
          path="/ongoingServices"
          element={<PrivateRoute element={<OngoingServices />} />}
        />
        <Route
          path="/createOffer"
          element={<PrivateRoute element={<CreateOffer />} />}
        />
        <Route
          path="/editOffer/:id"
          element={<PrivateRoute element={<EditOffer />} />}
        />
        <Route
          path="/reviews/:userId"
          element={<PrivateRoute element={<Reviews />} />}
        />
        <Route path="/groups" element={<PrivateRoute element={<Groups />} />} />
        <Route
          path="/createGroup"
          element={<PrivateRoute element={<CreateGroup />} />}
        />
        <Route
          path="/displayGroup/:id"
          element={<PrivateRoute element={<GroupDisplay />} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
