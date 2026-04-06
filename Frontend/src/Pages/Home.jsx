import React, { useEffect, useState } from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import NoMemory from "./NoMemory";
import MemoryCard from "../Components/MemoryCard";
import NotLogin from "./NotLogin";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";
import { CircleArrowUp } from "lucide-react";

function Home() {
  let { allMemories, getAllMemories } = useAllContexts();
  let [postsFound, setPostsFound] = useState(false);

  useEffect(() => {
    if (!postsFound) {
      let fetchMemories = async () => {
        await getAllMemories();
      };
      fetchMemories();
      setPostsFound(true);
    }
  }, [allMemories]);

  let { isLogin } = useAllContexts();
  let { showLoader } = useLoader();

  return (
    <>
      {showLoader ? (
        <div className="h-screen w-screen flex justify-center items-center bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black">
          <Loader />
        </div>
      ) : (
        <section
          id="topBar"
          className="min-h-screen w-full relative px-4 py-8 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black transition-colors duration-500"
        >
          {isLogin && (
            <div>
              <CircleArrowUp
                onClick={() => {
                  document
                    .querySelector("#topBar")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="text-gray-100 bg-indigo-600"
                style={{
                  position: "fixed",
                  bottom: "5%",
                  right: "5%",
                  cursor: "pointer",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  padding: "0",
                  zIndex: "55",
                }}
              />
            </div>
          )}
          <div className="max-w-7xl mx-auto">
            {isLogin ? (
              allMemories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allMemories?.map((elm, idx) => {
                    return (
                      <MemoryCard
                        key={idx}
                        title={elm.title}
                        memoryId={elm._id}
                        description={elm.description}
                        doc={elm.createdAt}
                        addedMs={elm.addedMs ? elm.addedMs : "Time Unavailable"}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-[60vh]">
                  <NoMemory />
                </div>
              )
            ) : (
              <div className="flex justify-center items-center min-h-[60vh]">
                <NotLogin />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
