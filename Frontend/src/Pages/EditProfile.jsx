import React, { useEffect, useState } from "react";
import { useAllContexts } from "../Contexts/AllContexts";
import { baseURL } from "../baseURL";
import { errorEmitter, successEmitter } from "../emitter";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../Contexts/LoaderContext";
import Loader from "../Loader/Loader";

function EditProfile() {
  let { user, authToken, setUser } = useAllContexts();
  const navigate = useNavigate();
  let { showLoader, setShowLoader } = useLoader();

  let updateProfile = async (userState) => {
    try {
      setShowLoader(true);

      let formData = new FormData();

      if (userState.name) formData.append("name", userState?.name);
      if (userState.age) formData.append("age", userState?.age);
      if (userState.city) formData.append("city", userState?.city);
      if (userState.zipcode) formData.append("zipcode", userState?.zipcode);
      if (userState.state) formData.append("state", userState?.state);
      if (userState.gender) formData.append("gender", userState?.gender);
      if (userState.bio) formData.append("bio", userState?.bio);
      if (userState.profilepic)
        formData.append("profilepic", userState?.profilepic);
      if (userState.phoneno) formData.append("phoneno", userState?.phoneno);

      let response = await fetch(`${baseURL}/user/api/updateprofile`, {
        method: "PUT",
        headers: { authToken },
        body: formData,
      });

      let updateProfileData = await response.json();
      //console.log(updateProfileData);
      if (updateProfileData.success) {
        successEmitter(updateProfileData.message);

        setUser(updateProfileData.updatedUser);

        navigate("/");

        localStorage.setItem(
          "memoryUser",
          JSON.stringify(updateProfileData.updatedUser),
        );
      } else errorEmitter(updateProfileData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  let [userState, setUserState] = useState({
    name: "",
    city: "",
    zipcode: "",
    state: "",
    gender: "",
    phoneno: "",
    bio: "",
    age: 0,
    profilepic: "",
  });

  let [previewImg, setPreviewImg] = useState("");

  let onChangeFunc = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUserState({
      name: user.name,
      city: user.city,
      zipcode: user.zipcode,
      state: user.state,
      phoneno: user.phoneno,
      gender: user.gender,
      bio: user.bio,
      age: user.age,
      profilepic: "",
    });
  }, []);

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
                Edit Profile
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal details
              </p>
            </div>

            {/* IMAGE PREVIEW */}
            {(previewImg || user?.profilepic) && (
              <div className="flex justify-center">
                <img
                  src={previewImg || user?.profilepic}
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-md"
                />
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await updateProfile(userState);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                required
                value={userState.name}
                onChange={onChangeFunc}
                placeholder="Full Name"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800  focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="number"
                name="age"
                value={userState.age}
                onChange={onChangeFunc}
                placeholder="Age"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="text"
                name="city"
                value={userState.city}
                onChange={onChangeFunc}
                placeholder="City"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="text"
                name="state"
                value={userState.state}
                onChange={onChangeFunc}
                placeholder="State"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="number"
                name="zipcode"
                value={userState.zipcode}
                onChange={onChangeFunc}
                placeholder="ZIP Code"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <input
                type="number"
                name="phoneno"
                value={userState.phoneno}
                onChange={onChangeFunc}
                placeholder="Phone Number"
                className="px-4 py-3 dark:text-gray-100 rounded-xl bg-gray-100 dark:bg-gray-800"
              />

              <select
                name="gender"
                value={userState.gender}
                onChange={onChangeFunc}
                className="px-4 dark:text-gray-100 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>

              <textarea
                name="bio"
                value={userState.bio}
                onChange={onChangeFunc}
                placeholder="Bio"
                rows={3}
                className="px-4 dark:text-gray-100 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 sm:col-span-2"
              />

              <input
                type="file"
                name="profilepic"
                onChange={(e) => {
                  let file = e.target.files[0];

                  setUserState({ ...userState, profilepic: file });

                  setPreviewImg(URL.createObjectURL(file));
                }}
                className="sm:col-span-2 block w-full text-sm dark:text-gray-100 text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-100 file:text-purple-700
                hover:file:bg-purple-200"
              />

              {/* BUTTON */}
              <button className="sm:col-span-2 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-lg">
                Update Profile
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default EditProfile;
