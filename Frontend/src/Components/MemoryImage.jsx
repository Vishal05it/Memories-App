import { Trash } from "lucide-react";
import React from "react";
import { baseURL } from "../baseURL";
import { useAllContexts } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../emitter";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";

function MemoryImage({ photoSrc, memoryId, photoId }) {
  let { authToken, getOneMemory } = useAllContexts();
  let { showLoader, setShowLoader } = useLoader();

  let deletePhoto = async () => {
    try {
      setShowLoader(true);

      let response = await fetch(
        `${baseURL}/photo/api/deletephoto/${encodeURIComponent(photoId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        },
      );

      let delPhotoData = await response.json();

      if (delPhotoData.success) {
        successEmitter(delPhotoData.message);
        await getOneMemory(memoryId);
      } else errorEmitter(delPhotoData.message);
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
        <div className="relative my-2 group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700  shadow-sm hover:shadow-md transition">
          {/* IMAGE */}
          <img
            src={photoSrc}
            alt=""
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* DELETE BUTTON */}
          <button
            onClick={async () => {
              await deletePhoto();
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
          >
            <Trash size={16} />
          </button>
        </div>
      )}
    </>
  );
}

export default MemoryImage;
