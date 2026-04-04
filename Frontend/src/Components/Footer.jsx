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

              <span className="text-xl font-semibold">My Memories</span>
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
                  <i class="fa-solid fa-envelope"></i> :
                  www.vishal.tiwari007@gmail.com
                </a>
              </li>
              <li className="hover:text-purple-600 cursor-pointer">
                <a target="_blank" href="https://my-portfolio-7ffo.vercel.app/">
                  <i class="fa-solid fa-circle-info"></i> About the Creator
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
              <a
                href="https://www.linkedin.com/in/vishal-tiwari-17684822a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <i
                  style={{
                    color: "blue",
                  }}
                  class="fa-brands fa-linkedin"
                ></i>
              </a>

              <a
                href="https://github.com/Vishal05it"
                target="_blank"
                className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <i className="fa-brands fa-github dark:bg-white dark:text-black bg-black text-white"></i>
              </a>

              <a
                href="https://www.instagram.com/vishal_tiwari_tiwari_ji?igsh=MXc0aTAza2I1aGR1cg=="
                title="Instagram"
                target="_blank"
                className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <i style={{ color: "pink" }} class="fa-brands fa-instagram"></i>
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
