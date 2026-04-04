import React, { useEffect, useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseURL } from "../baseURL";
import { useAllContexts } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../emitter";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";
import { timeCalc } from "../TimeCalculator";

function MemoryCard({ title, description, memoryId, addedMs, doc }) {
  let [photos, setPhotos] = useState([]);
  let getRealDate = (doc) => {
    let docString = doc.toString();
    let year = docString.slice(0, 4);

    let allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = docString.slice(5, 7);
    let day = docString.slice(8, 10);
    console.log(day);
    let realMonth = allMonths[month - 1];
    console.log(realMonth);
    console.log(year);
    return `${day}/${realMonth}/${year}`;
  };
  useEffect(() => {
    getRealDate(doc);
  }, []);
  const navigate = useNavigate();
  let { authToken, getAllMemories } = useAllContexts();
  let { showLoader, setShowLoader } = useLoader();

  let getAllPics = async () => {
    try {
      let response = await fetch(
        `${baseURL}/photo/api/getallphotos/${memoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        },
      );

      let allPicsData = await response.json();

      if (allPicsData.success) {
        successEmitter(allPicsData.message);
        setPhotos(allPicsData.allPics);
      } else errorEmitter(allPicsData.message);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteMemory = async (memoryId) => {
    try {
      setShowLoader(true);

      let response = await fetch(
        `${baseURL}/memory/api/deletememory/${memoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        },
      );

      let deleteData = await response.json();

      if (deleteData.success) {
        successEmitter(deleteData.message);
        await getAllMemories();
        navigate("/");
      } else errorEmitter(deleteData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    let fetchPics = async () => {
      await getAllPics();
    };

    fetchPics();
  }, [memoryId]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
          {/* IMAGE SECTION */}
          <div className="relative h-90 w-full overflow-x-auto flex gap-3 py-1 p-4">
            {photos?.length > 0 ? (
              photos.map((elm, idx) => {
                return (
                  <img
                    key={idx}
                    className="h-auto w-full aspect-video rounded-xl object-cover object-center hover:scale-105 transition-transform duration-300"
                    src={
                      elm.photo
                        ? elm.photo
                        : "https://anitacleare.co.uk/wp-content/uploads/2020/01/dimitri-houtteman-2P6Q7_uiDr0-unsplash-768x512.jpg"
                    }
                    alt="Image"
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center h-40 w-full text-gray-500">
                No Photos
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="p-5 relative flex flex-col gap-3">
            {/* ACTION BUTTONS */}
            <div className="absolute top-3 right-3 flex gap-3 text-gray-600 dark:text-gray-300">
              <NavLink
                to={`/editmemory/${memoryId}`}
                className="hover:text-purple-500 transition"
              >
                <PencilLine size={18} />
              </NavLink>

              <button
                onClick={async () => {
                  await deleteMemory(memoryId);
                }}
                className="hover:text-red-500 transition"
              >
                <Trash size={18} />
              </button>
            </div>

            {/* TITLE */}
            <h2 className="text-lg my-5 font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>

            {/* TIME */}
            <span className="text-xs flex justify-between w-full py-5 px-0 text-gray-400">
              Last updated {addedMs ? timeCalc(addedMs) : "Time Unavailable"}
              <span className="text-xs text-gray-400">
                Created at : {doc ? getRealDate(doc) : "Date Unavailable"}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default MemoryCard;
