import React, { useState } from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import { X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  let {
    currAnim,
    setCurrAnim,
    user,
    searchMemory,
    setAllMemories,
    setAuthToken,
    setisLogin,
    setCurrMemory,
    setUser,
    setCanSendOTP,
  } = useAllContexts();

  let [keyword, setKeyword] = useState("");

  let logOutFunc = () => {
    setAllMemories([]);
    setAuthToken(null);
    setUser({});
    setCurrMemory({});
    setCanSendOTP(true);
    setisLogin(false);
    setCurrAnim("hideBar");
    localStorage.removeItem("authToken");
    localStorage.removeItem("memoryUser");
    localStorage.removeItem("isLoginMemory");
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          height: "100vh",
          width: "300px",
          zIndex: "55",
          animation: `${currAnim} 0.5s ease forwards`,
        }}
        className="fixed top-0 right-0 h-full w-72 p-5 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-l border-gray-200 dark:border-gray-700 shadow-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => {
            setCurrAnim("hideBar");
          }}
          className="absolute dark:text-red-600 top-4 right-4 hover:rotate-90 transition"
        >
          <X />
        </button>

        {/* PROFILE SECTION */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={user?.profilepic}
            alt=""
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user?.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your Memories
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Search memories..."
              className="bg-transparent w-full outline-none text-sm dark:text-white"
            />
            <button
              onClick={async () => {
                await searchMemory(keyword);
                setKeyword("");
                setCurrAnim("hideBar");
              }}
              className="text-gray-500 dark:text-gray-100 hover:text-purple-500"
            >
              🔍
            </button>
          </div>
        </div>

        {/* MENU */}
        <ul className="space-y-2 text-sm font-medium">
          <NavLink
            to="/profilepage"
            onClick={() => {
              setCurrAnim("hideBar");
            }}
            className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
          >
            👤 <span className="ml-3 dark:text-gray-100">View Profile</span>
          </NavLink>

          <NavLink
            to="/creatememory"
            onClick={() => {
              setCurrAnim("hideBar");
            }}
            className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
          >
            ✨ <span className="ml-3 dark:text-gray-100">Create Memory</span>
          </NavLink>

          <NavLink
            to="/"
            onClick={() => {
              setCurrAnim("hideBar");
            }}
            className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            ❤️ <span className="ml-3 dark:text-gray-100">Back to Homepage</span>
          </NavLink>
        </ul>

        {/* SETTINGS */}
        <div className="mt-8 border-t pt-4 dark:border-gray-300">
          <ul className="space-y-2 text-sm font-medium">
            <NavLink
              to="/editprofile"
              onClick={() => {
                setCurrAnim("hideBar");
              }}
              className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
            >
              ⚙️ <span className="ml-3 dark:text-gray-100">Edit Profile</span>
            </NavLink>

            <NavLink
              to="/updateemail"
              onClick={() => {
                setCurrAnim("hideBar");
              }}
              className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
            >
              📧 <span className="ml-3 dark:text-gray-100">Update Email</span>
            </NavLink>

            <NavLink
              to="/updatepassword"
              onClick={() => {
                setCurrAnim("hideBar");
              }}
              className="flex items-center p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
            >
              🔐{" "}
              <span className="ml-3 dark:text-gray-100">Update Password</span>
            </NavLink>

            <button
              onClick={() => {
                logOutFunc();
                setCurrAnim("hideBar");
              }}
              className="flex w-full items-center p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              🚪 <span className="ml-3 dark:text-gray-100">Logout</span>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
