import React, { useState } from "react";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { baseURL } from "../baseURL";
import { useAllContexts } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../emitter";

function UpdatePassword() {
  let { showLoader, setShowLoader } = useLoader();

  let [userState, setUserState] = useState({
    password: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  let { authToken } = useAllContexts();

  let onChangeFunc = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  let updatePassword = async () => {
    try {
      setShowLoader(true);

      let response = await fetch(`${baseURL}/user/api/updatepassbyenter`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
        body: JSON.stringify(userState),
      });

      let resetPass = await response.json();

      if (resetPass.success) {
        successEmitter(resetPass.message);

        navigate("/");
      } else errorEmitter(resetPass.message);
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
        <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black">
          <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
            {/* HEADER */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Update Password
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your current password and choose a new one
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updatePassword();
              }}
              className="space-y-4"
            >
              <input
                type="password"
                name="password"
                value={userState.password}
                onChange={onChangeFunc}
                placeholder="Current Password"
                className="w-full dark:text-gray-100 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                name="newPassword"
                value={userState.newPassword}
                onChange={onChangeFunc}
                placeholder="New Password"
                className="w-full dark:text-gray-100 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              {/* CHANGE PASSWORD */}
              <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-md">
                Change Password
              </button>
            </form>

            {/* OTP OPTION */}
            <div className="text-center">
              <NavLink
                to="/passwordotp"
                className="text-sm text-purple-600 hover:underline"
              >
                Reset password using OTP instead
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default UpdatePassword;
