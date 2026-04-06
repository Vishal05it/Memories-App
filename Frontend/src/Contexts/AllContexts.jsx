import React, { createContext, useContext, useState } from "react";
import { baseURL } from "../baseURL";
import { successEmitter } from "../emitter";
import { errorEmitter } from "../emitter";
import { useLoader } from "./LoaderContext";

let allContexts = createContext();
function AllContexts({ children }) {
  let { setShowLoader } = useLoader();
  let [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  let [isLogin, setisLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginMemory")) || false,
  );
  let [canSendOTP, setCanSendOTP] = useState(
    JSON.parse(localStorage.getItem("canSendOTP")) || true,
  );
  let [currMemory, setCurrMemory] = useState({});
  let [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || false,
  );
  let [user, setUser] = useState(
    JSON.parse(localStorage.getItem("memoryUser")) || {},
  );
  let [allMemories, setAllMemories] = useState([]);
  let darkModeFunc = () => {
    let htmlTag = document.querySelector("html");
    htmlTag.classList.remove("light");
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };
  let lightModeFunc = () => {
    let htmlTag = document.querySelector("html");
    htmlTag.classList.remove("light");
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
    setTheme("light");
    localStorage.setItem("theme", "light");
  };
  let toggleTheme = () => {
    if (theme == "dark") {
      lightModeFunc();
    } else darkModeFunc();
  };
  let [picsFound, setPicsFound] = useState(false);
  let [currAnim, setCurrAnim] = useState("hideBar");
  // Async Requests below : -

  let getAllMemories = async () => {
    try {
      setShowLoader(true);
      let response = await fetch(`${baseURL}/memory/api/getmymemories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken,
        },
      });
      let getData = await response.json();
      if (getData.success) {
        setAllMemories(getData.allMemories);
        // successEmitter(getData.message);
      }
      //  console.log(getData);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };
  let getOneMemory = async (memoryId) => {
    try {
      setShowLoader(true);
      let response = await fetch(
        `${baseURL}/memory/api/getonememory/${memoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        },
      );
      let getOneData = await response.json();
      if (getOneData.success) {
        // successEmitter(getOneData.message);
        setCurrMemory(getOneData.oneMemory);
      } else errorEmitter(getOneData.message);
      // console.log(getOneData);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };
  let searchMemory = async (keyword) => {
    try {
      setShowLoader(true);
      let response = await fetch(
        `${baseURL}/memory/api/searchmemory?keyword=${keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        },
      );
      let searchData = await response.json();
      // console.log(searchData);
      if (searchData.success) {
        successEmitter(searchData.message);
        setAllMemories(searchData.searchMemories);
        return true;
      } else {
        errorEmitter(searchData.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <allContexts.Provider
      value={{
        lightModeFunc,
        darkModeFunc,
        toggleTheme,
        theme,
        setTheme,
        isLogin,
        setisLogin,
        user,
        setUser,
        authToken,
        setAuthToken,
        getAllMemories,
        allMemories,
        getOneMemory,
        setAllMemories,
        currMemory,
        setCurrMemory,
        currAnim,
        setCurrAnim,
        searchMemory,
        canSendOTP,
        setCanSendOTP,
        picsFound,
        setPicsFound,
      }}
    >
      {children}
    </allContexts.Provider>
  );
}
export const useAllContexts = () => {
  return useContext(allContexts);
};
export default AllContexts;
