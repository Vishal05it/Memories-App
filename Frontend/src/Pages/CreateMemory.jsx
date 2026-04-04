import React, { useState } from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../emitter";
import { baseURL } from "../baseURL";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";

function CreateMemory() {
  let { authToken } = useAllContexts();
  let { showLoader, setShowLoader } = useLoader();
  const navigate = useNavigate();

  let createMemory = async (memory) => {
    if (!memory.title || !memory.description) {
      errorEmitter("Title and Description both are required!");
      return;
    }
    if (memory.title.length < 2) {
      errorEmitter("Title must be more than 2 characters");
      return;
    }
    if (memory.description.length < 10) {
      errorEmitter("Description must be more than 10 characters");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("title", memory.title);
      formData.append("description", memory.description);
      formData.append("addedMs", Date.now());

      if (memory.photos.length > 0) {
        memory.photos.forEach((elm) => {
          formData.append("photos", elm);
        });
      }

      setShowLoader(true);

      let response = await fetch(`${baseURL}/memory/api/creatememory`, {
        method: "POST",
        headers: {
          authToken,
        },
        body: formData,
      });

      let createData = await response.json();

      if (createData.success) {
        successEmitter(createData.message);
        navigate("/");
      } else errorEmitter(createData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  let [memory, setMemory] = useState({
    title: "",
    description: "",
    photos: [],
  });

  let [firstMemoryImg, setFirstMemoryImg] = useState("");

  let onChangeFunc = (e) => {
    setMemory({ ...memory, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black transition-colors duration-500">
          <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
            {/* HEADER */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Create New Memory
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Capture a moment worth remembering
              </p>
            </div>

            {/* TITLE */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={memory.title}
                onChange={(e) => onChangeFunc(e)}
                placeholder="Give your memory a title..."
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={memory.description}
                onChange={(e) => onChangeFunc(e)}
                placeholder="Write about this memory..."
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* IMAGE PREVIEW */}
            {firstMemoryImg && (
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                <img
                  src={firstMemoryImg}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* FILE INPUT */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Upload Photos
              </label>

              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-100 file:text-purple-700
                hover:file:bg-purple-900
                dark:file:bg-purple-900 dark:file:text-purple-200"
                onChange={(e) => {
                  setFirstMemoryImg(URL.createObjectURL(e.target.files[0]));
                  let files = Array.from(e.target.files);
                  setMemory({ ...memory, photos: files });
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={async () => {
                await createMemory(memory);
              }}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-lg hover:shadow-xl"
            >
              Save Memory 📸
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default CreateMemory;
