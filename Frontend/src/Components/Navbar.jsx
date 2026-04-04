import React, { useEffect, useState } from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import { NavLink } from "react-router-dom";

function Navbar() {
  let {
    toggleTheme,
    lightModeFunc,
    darkModeFunc,
    theme,
    isLogin,
    user,
    setCurrAnim,
    searchMemory,
  } = useAllContexts();

  useEffect(() => {
    if (theme == "light") {
      lightModeFunc();
    } else darkModeFunc();
  }, []);

  let [keyword, setKeyword] = useState("");

  return (
    <>
      <header
        id="navbar"
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* LEFT NAV LINKS */}
            <ul className="items-center hidden lg:flex space-x-2 font-medium">
              <li>
                <NavLink
                  to="/"
                  className="px-4 py-2 dark:text-gray-100 rounded-lg transition hover:bg-purple-100 dark:hover:bg-gray-800"
                >
                  Home
                </NavLink>
              </li>

              {isLogin ? (
                <li>
                  <NavLink
                    to="/creatememory"
                    className="px-4 py-2 dark:text-gray-100 rounded-lg transition hover:bg-purple-100 dark:hover:bg-gray-800"
                  >
                    Create Memory
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/signup"
                    className="px-4 dark:text-gray-100 py-2 rounded-lg transition hover:bg-purple-100 dark:hover:bg-gray-800"
                  >
                    Sign Up
                  </NavLink>
                </li>
              )}

              <li>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition"
                >
                  🌗
                </button>
              </li>
            </ul>

            {/* LOGO */}
            <NavLink
              to="/"
              className="flex items-center space-x-2 text-xl font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-8 h-8 text-purple-600"
              >
                <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
              </svg>
              <span className="hidden sm:block dark:text-gray-100">
                Memories
              </span>
            </NavLink>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">
              {/* SEARCH */}
              <div className="relative srchMem w-30 sm:w-45 md:w-55">
                <button
                  onClick={async () => {
                    await searchMemory(keyword);
                    setKeyword("");
                  }}
                  className="absolute left-3 top-2.5 text-gray-400"
                >
                  🔍
                </button>

                <input
                  type="search"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white/70 dark:text-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
              </div>

              {/* PROFILE OR LOGIN */}
              {isLogin ? (
                <img
                  onClick={() => {
                    setCurrAnim("showBar");
                  }}
                  src={user?.profilepic}
                  className="h-11 userLogo w-11 rounded-full object-cover border-2 border-purple-500 cursor-pointer hover:scale-105 transition"
                  alt=""
                />
              ) : (
                <NavLink
                  to="/login"
                  className="px-5 py-2 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Log in
                </NavLink>
              )}

              {/* MOBILE MENU BUTTON
              <button className="lg:hidden p-2">☰</button> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
