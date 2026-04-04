import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseURL } from "../baseURL";
import { useAllContexts } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../emitter";
import Loader from "../Loader/Loader";
import { useLoader } from "../Contexts/LoaderContext";

function UpdateEmail() {
  let { authToken } = useAllContexts();

  let [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  let { showLoader, setShowLoader } = useLoader();

  let onChangeFunc = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  let updateEmail = async () => {
    try {
      setShowLoader(true);

      let response = await fetch(
        `${baseURL}/user/api/updateemail/${userState.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
          body: JSON.stringify({
            password: userState.password,
          }),
        },
      );

      let emailData = await response.json();

      if (emailData.success) {
        successEmitter(emailData.message);

        navigate("/");
      } else errorEmitter(emailData.message);
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
                Update Email
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your new email and confirm your password
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateEmail();
              }}
              className="space-y-4"
            >
              <input
                type="email"
                name="email"
                value={userState.email}
                onChange={onChangeFunc}
                placeholder="New Email Address"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                name="password"
                value={userState.password}
                onChange={onChangeFunc}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              {/* BUTTON */}
              <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-md">
                Change Email
              </button>
            </form>

            {/* FORGOT PASSWORD */}
            <div className="text-center">
              <NavLink
                to="/forgotpassword"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot your password?
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default UpdateEmail;
