import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAllContexts } from "../Contexts/AllContexts";
import { baseURL } from "../baseURL";
import { errorEmitter, successEmitter } from "../emitter";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";

function ForgotPassword() {
  let { canSendOTP, setCanSendOTP, authToken } = useAllContexts();

  let [otpSent, setOtpSent] = useState(false);

  let [otpSys, setOtpSys] = useState(
    Math.floor(Math.random() * 9) * 10000 +
      Math.floor(Math.random() * 9) * 1000 +
      Math.floor(Math.random() * 9) * 100 +
      Math.floor(Math.random() * 9) * 10 +
      Math.floor(Math.random() * 9),
  );

  let [userState, setUserState] = useState({
    email: "",
    otpUser: "",
    password: "",
  });

  let onChangeFunc = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  let { showLoader, setShowLoader } = useLoader();

  let resetPass = async (otpSys, otpSent) => {
    try {
      setShowLoader(true);

      let response = await fetch(
        `${baseURL}/user/api/forgotpassword/${userState.email}/${otpSys}/${otpSent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
          body: JSON.stringify({
            otpUser: userState.otpUser,
            password: userState.password,
          }),
        },
      );

      let resetData = await response.json();

      if (resetData.success) {
        successEmitter(resetData.message);

        setCanSendOTP(false);

        setOtpSent(true);

        localStorage.setItem("canSendOTP", false);
      } else errorEmitter(resetData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    console.log("Curr OTP : ", otpSys);
  }, []);

  useEffect(() => {
    if (!canSendOTP) {
      setTimeout(() => {
        setCanSendOTP(true);

        localStorage.setItem("canSendOTP", true);

        successEmitter("You can request new OTP now");
      }, 60000);
    }
  }, [canSendOTP]);

  useEffect(() => {
    setTimeout(() => {
      setOtpSent(false);

      setOtpSys(
        Math.floor(Math.random() * 9) * 10000 +
          Math.floor(Math.random() * 9) * 1000 +
          Math.floor(Math.random() * 9) * 100 +
          Math.floor(Math.random() * 9) * 10 +
          Math.floor(Math.random() * 9),
      );
    }, 120000);
  }, [otpSys]);

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
                Reset Password
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and OTP to reset your password
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await resetPass(otpSys, true);
              }}
              className="space-y-4"
            >
              <input
                type="email"
                name="email"
                value={userState.email}
                onChange={onChangeFunc}
                placeholder="Enter Email"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                name="password"
                value={userState.password}
                onChange={onChangeFunc}
                placeholder="New Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="number"
                name="otpUser"
                value={userState.otpUser}
                onChange={onChangeFunc}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-md">
                Change Password
              </button>
            </form>

            {/* SEND OTP */}
            <button
              onClick={async () => {
                if (canSendOTP) {
                  await resetPass(otpSys, false);
                } else errorEmitter("Wait a minute before requesting new OTP");
              }}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Send OTP
            </button>

            {/* LOGIN LINK */}
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <NavLink to="/login" className="text-purple-600 font-medium">
                Login
              </NavLink>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default ForgotPassword;
