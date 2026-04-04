import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAllContexts } from "../Contexts/AllContexts";
import { baseURL } from "../baseURL";
import { errorEmitter, successEmitter } from "../emitter";
import Loader from "../Loader/Loader";
import { useLoader } from "../Contexts/LoaderContext";

function Login() {
  let { user, setUser, setAuthToken, setisLogin } = useAllContexts();
  const navigate = useNavigate();

  let [currUser, setCurrUser] = useState({
    email: "",
    password: "",
  });

  let { showLoader, setShowLoader } = useLoader();

  let loginFunc = async () => {
    try {
      setShowLoader(true);

      let response = await fetch(`${baseURL}/user/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currUser.email,
          password: currUser.password,
        }),
      });

      let loginData = await response.json();

      if (loginData.success) {
        successEmitter(loginData.message);

        setUser(loginData.user);

        navigate("/");

        localStorage.setItem("memoryUser", JSON.stringify(loginData.user));

        setAuthToken(loginData.authToken);

        localStorage.setItem("authToken", loginData.authToken);

        setisLogin(true);

        localStorage.setItem("isLoginMemory", true);
      } else errorEmitter(loginData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  let onChangeFunc = (e) => {
    setCurrUser({
      ...currUser,
      [e.target.name]: e.target.value,
    });
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
                Welcome Back
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Log in to continue your memories
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                loginFunc();
              }}
              className="space-y-4"
            >
              <input
                type="email"
                name="email"
                value={currUser.email}
                onChange={onChangeFunc}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="password"
                name="password"
                value={currUser.password}
                onChange={onChangeFunc}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              {/* FORGOT PASSWORD */}
              <div className="text-right text-sm">
                <NavLink
                  to="/forgotpassword"
                  className="text-purple-600 hover:underline"
                >
                  Forgot Password?
                </NavLink>
              </div>

              {/* LOGIN BUTTON */}
              <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-lg">
                Log In
              </button>
            </form>

            {/* SIGNUP */}
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-purple-600 font-medium hover:underline"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
