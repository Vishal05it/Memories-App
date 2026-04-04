import React from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import { NavLink } from "react-router-dom";

function ProfilePage() {
  let { user } = useAllContexts();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black">
      <div className="relative w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6 text-center">
        {/* EDIT PROFILE */}
        <NavLink
          to="/editprofile"
          className="absolute top-4 right-4 text-sm px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Edit
        </NavLink>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          <img
            src={user?.profilepic}
            alt=""
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-md"
          />
        </div>

        {/* NAME + BIO */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.bio ? user.bio : "No bio available"}
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
              ></path>
            </svg>

            <span>{user?.email}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
              ></path>
            </svg>

            <span>
              {user?.phoneno ? user?.phoneno : "Phone number unavailable"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
