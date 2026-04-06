import React, { useState } from "react";
import { baseURL } from "../baseURL";
import { NavLink, useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../emitter";
import Loader from "../Loader/Loader";
import { useLoader } from "../Contexts/LoaderContext";
import { useAllContexts } from "../Contexts/AllContexts";

function Signup() {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    zipcode: "",
    state: "",
    gender: "",
    phoneno: "",
    bio: "",
    age: 0,
    profilepic: "",
  });

  let { showLoader, setShowLoader } = useLoader();
  let { isLogin } = useAllContexts();
  let onChangeFunc = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let signUpFunction = async () => {
    if (!isLogin) {
      try {
        let formData = new FormData();

        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("name", user.name);
        formData.append("city", user.city);
        formData.append("zipcode", user.zipcode);
        formData.append("state", user.state);
        formData.append("gender", user.gender);
        formData.append("phoneno", user.phoneno);
        formData.append("bio", user.bio);
        formData.append("age", user.age);
        formData.append("profilepic", user.profilepic);

        if (user.name.length < 2) {
          console.log("Name must be greater than 2 characters");
          return;
        }

        if (user.password.length < 8) {
          console.log("Password must be greater than 8 characters");
          return;
        }

        setShowLoader(true);

        let response = await fetch(`${baseURL}/user/api/signup`, {
          method: "POST",
          body: formData,
        });

        let signUpData = await response.json();

        if (signUpData.success) {
          successEmitter(signUpData.message);

          navigate("/");
        } else errorEmitter(signUpData.message);
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoader(false);
      }
    } else errorEmitter("Please logout first to create a bew account!");
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-black">
          <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
            {/* HEADER */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Create Account
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start saving your memories today
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signUpFunction();
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                required
                value={user.name}
                onChange={onChangeFunc}
                placeholder="Full Name"
                className="px-4 dark:text-gray-100 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="number"
                name="age"
                value={user.age}
                onChange={onChangeFunc}
                placeholder="Age"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="email"
                name="email"
                required
                value={user.email}
                onChange={onChangeFunc}
                placeholder="Email"
                className="px-4 py-3 dark:text-gray-100  rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              />

              <input
                type="password"
                name="password"
                required
                value={user.password}
                onChange={onChangeFunc}
                placeholder="Password"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              />

              <input
                type="text"
                name="city"
                value={user.city}
                onChange={onChangeFunc}
                placeholder="City"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="text"
                name="state"
                value={user.state}
                onChange={onChangeFunc}
                placeholder="State"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="text"
                name="zipcode"
                value={user.zipcode}
                onChange={onChangeFunc}
                placeholder="ZIP Code"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="text"
                name="phoneno"
                value={user.phoneno}
                onChange={onChangeFunc}
                placeholder="Phone Number"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <select
                name="gender"
                value={user.gender}
                onChange={onChangeFunc}
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>

              <textarea
                name="bio"
                value={user.bio}
                onChange={onChangeFunc}
                placeholder="Short Bio"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              />

              <input
                type="file"
                name="profilepic"
                onChange={(e) => {
                  let file = e.target.files[0];
                  setUser({ ...user, profilepic: file });
                }}
                className="sm:col-span-2 dark:text-gray-100 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-100 file:text-purple-700
                hover:file:bg-purple-200"
              />

              {/* BUTTON */}
              <button className="sm:col-span-2 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-lg">
                Create Account
              </button>
            </form>

            {/* LOGIN LINK */}
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-purple-600 font-medium hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default Signup;
