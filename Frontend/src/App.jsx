import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import { useLoader } from "./Contexts/LoaderContext";
import Loader from "./Loader/Loader";
import { useEffect } from "react";
function App() {
  let { showLoader, setShowLoader } = useLoader();
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 600);
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Sidebar />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
