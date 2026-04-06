import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAllContexts } from "../Contexts/AllContexts";
import { baseURL } from "../baseURL";
import { errorEmitter, successEmitter } from "../emitter";
import MemoryImage from "../Components/MemoryImage";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";
import { timeCalc } from "../TimeCalculator";

function EditMemory() {
  let param = useParams();
  let [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  let { getOneMemory, currMemory, authToken } = useAllContexts();

  let [memory, setMemory] = useState({
    title: currMemory?.title ? currMemory?.title : "",
    description: currMemory?.description ? currMemory?.description : "",
    photos: currMemory?.photos ? currMemory?.photos : [],
    addedMs: currMemory?.addedMs ? currMemory?.addedMs : "",
  });

  let [memoryImg, setMemoryImg] = useState("");

  let { showLoader, setShowLoader } = useLoader();

  let onChangeFunc = (e) => {
    setMemory({ ...memory, [e.target.name]: e.target.value });
  };

  let getAllPics = async () => {
    try {
      let response = await fetch(
        `${baseURL}/photo/api/getallphotos/${param.memoryId}`,
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
        //successEmitter(allPicsData.message);
        setPhotos(allPicsData.allPics);
      } else errorEmitter(allPicsData.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let fetchMemory = async () => {
      await getOneMemory(param.memoryId);
      await getAllPics();
    };

    fetchMemory();
  }, []);

  useEffect(() => {
    setMemory({
      ...memory,
      title: currMemory.title,
      description: currMemory.description,
      photos: currMemory.photos,
      addedMs: currMemory.addedMs,
    });
  }, [currMemory]);

  let editMemory = async () => {
    if (!memory.title || !memory.description) {
      errorEmitter("Title and Description both are required!");
      return;
    }

    if (memory.title.length < 2) {
      errorEmitter("Title must be greater than 2 characters");
      return;
    }

    if (memory.description.length < 10) {
      errorEmitter("Description must be greater than 10 characters");
      return;
    }

    try {
      let formData = new FormData();

      formData.append("title", memory.title);
      formData.append("description", memory.description);
      formData.append("addedMs", Date.now());

      if (memory?.photos?.length > 0) {
        memory.photos.forEach((elm) => {
          formData.append("photos", elm);
        });
      }

      setShowLoader(true);

      let response = await fetch(
        `${baseURL}/memory/api/updatememory/${param.memoryId}`,
        {
          method: "PUT",
          headers: {
            authToken,
          },
          body: formData,
        },
      );

      let updatedData = await response.json();

      if (updatedData.success) {
        successEmitter(updatedData.message);
        navigate("/");
      } else errorEmitter(updatedData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <section className="min-h-screen flex justify-center items-start px-4 py-12 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black transition-colors duration-500">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
            {/* FORM CARD */}
            <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
              {/* TIME */}
              <div className="text-sm text-gray-400">
                Created {timeCalc(memory.addedMs)}
              </div>

              {/* HEADER */}
              <div className="text-center space-y-1">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                  Edit Memory ✏️
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your memory details
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
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* IMAGE PREVIEW */}
              {memoryImg && (
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                  <img
                    src={memoryImg}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* FILE INPUT */}
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-100 file:text-purple-700
                hover:file:bg-purple-200
                dark:file:bg-purple-900 dark:file:text-purple-200"
                onChange={(e) => {
                  let files = Array.from(e.target.files);
                  setMemory({ ...memory, photos: files });
                  setMemoryImg(URL.createObjectURL(e.target.files[0]));
                }}
              />

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={async () => {
                    await editMemory();
                  }}
                  className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-lg"
                >
                  Update Memory
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* EXISTING PHOTOS PANEL */}
            <div className="w-full lg:w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 h-80 flex flex-col gap-3  overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Existing Photos
              </h3>
              <div>
                {photos?.length > 0 ? (
                  photos.map((elm, idx) => {
                    return (
                      <MemoryImage
                        key={idx}
                        memoryId={param.memoryId}
                        photoId={elm._id}
                        photoSrc={elm.photo}
                      />
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">No photos</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default EditMemory;
