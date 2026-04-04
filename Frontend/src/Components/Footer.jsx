import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className=" border-t border-gray-200 dark:border-gray-700 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black text-gray-700 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                M
              </div>

              <span className="text-xl font-semibold">Memories</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Capture moments, relive memories, and keep your stories alive.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <NavLink to="/">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
                Home Page
              </h3>
            </NavLink>
            <ul className="space-y-2 text-sm">
              <NavLink to="/creatememory">
                <li className="hover:text-purple-600 mb-2 cursor-pointer">
                  Create Memory
                </li>
              </NavLink>
              <NavLink to="/profilepage">
                <li className="hover:text-purple-600 mb-2 cursor-pointer">
                  View Profile
                </li>
              </NavLink>
              <NavLink to="/editprofile">
                <li className="hover:text-purple-600 mb-2 cursor-pointer">
                  Edit Profile
                </li>
              </NavLink>
              {/* <li className="hover:text-purple-600 cursor-pointer"></li> */}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Company
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-600 cursor-pointer">
                <a href="mailto:www.vishal.tiwari007@gmail.com">
                  Email us : www.vishal.tiwari007@gmail.com
                </a>
              </li>
              <li className="hover:text-purple-600 cursor-pointer">
                <a target="_blank" href="https://my-portfolio-7ffo.vercel.app/">
                  About the Creator
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Social
            </h3>

            <div className="flex gap-4">
              <a className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer">
                📘
              </a>

              <a className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer">
                🐦
              </a>

              <a className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer">
                📸
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Memories App — Built with ❤️
        </div>
      </div>
    </footer>
  );
}

export default Footer;
