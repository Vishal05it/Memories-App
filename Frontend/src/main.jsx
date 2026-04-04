import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import AllContexts from "./Contexts/AllContexts.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import CreateMemory from "./Pages/CreateMemory.jsx";
import EditMemory from "./Pages/EditMemory.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import PasswordOTP from "./Pages/PasswordByOTP.jsx";
import UpdateEmail from "./Pages/UpdateEmail.jsx";
import LoaderContext from "./Contexts/LoaderContext.jsx";
import UpdatePassword from "./Pages/UpdatePassword.jsx";
import NoSearched from "./Pages/NoSearched.jsx";

let myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/nosearched/:keyword" element={<NoSearched />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/passwordotp" element={<PasswordOTP />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/updateemail" element={<UpdateEmail />} />
      <Route path="/updatepassword" element={<UpdatePassword />} />
      <Route path="/creatememory" element={<CreateMemory />} />
      <Route path="/editmemory/:memoryId" element={<EditMemory />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderContext>
      <AllContexts>
        <RouterProvider router={myRouter} />
      </AllContexts>
    </LoaderContext>
  </StrictMode>,
);
