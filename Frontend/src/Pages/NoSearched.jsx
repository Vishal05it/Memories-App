import React from "react";
import { useParams } from "react-router-dom";

function NoSearched() {
  let param = useParams();
  return (
    <>
      <section className="min-h-screen min-w-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black">
        <div className="max-w-md w-full text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 space-y-6">
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-32 h-32 mx-auto text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>

          {/* MESSAGE */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              No Memories with the name : {param.keyword}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Looks like you haven't saved any memories yet. Start capturing
              moments and build your memory timeline.
            </p>
          </div>

          {/* BUTTON */}
          <NavLink
            to="/creatememory"
            className="inline-block px-8 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-md"
          >
            Create a Memory
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default NoSearched;
