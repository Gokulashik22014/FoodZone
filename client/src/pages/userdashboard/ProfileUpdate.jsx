import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
function ProfileUpdate() {
  const { updateUserProfile } = useContext(AuthContext);
  const data = useLoaderData();
  const {user}=data.data
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const imageApiKey = import.meta.env.VITE_IMGBB_API;
  const [purl,setPurl]=useState(user?.photoURL)
  const axiosSecure=useAxiosSecure()
  async function onSubmit(data) {
    const apiCall = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
    let result
    if (user.photoURL != data.photoURL) {
      result = await axios
        .post(
          apiCall,
          { image: data.photoURL[0] },
          {
            headers: {
              "content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => res.data);
    }
    if (result.success) {
      data.photoURL = result.data.display_url;
    }
    console.log("i was called")
    setPurl(data.photoURL)
    updateUserProfile(data.username, data.photoURL);
    await axiosSecure.post(`updateuser/${user._id}`,{data})
    reset()
    navigate("/")
  }
  return (
    <div className="max-w-md my-64 mx-auto border rounded-lg ">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-3xl md:text-4xl">Update Profile</h1>
        <div className="flex justify-center max-w-24 mx-auto">
          <img className="rounded-full" src={purl ||  "/images/userImg.webp"} alt="" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile image</span>
          </label>
          {/* {<input type="text" placeholder="url" className="input input-bordered" {...register("photoURL")} required />} */}
          <input
            type="file"
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
            {...register("photoURL")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered"
            {...register("username")}
            required
            defaultValue={user?.username}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Your address"
            {...register("address", { required: true })}
            defaultValue={user?.address}
          ></textarea>
        </div>
        <div>
          <h1>Email</h1>
          <h2 className="bg-amber-300 rounded-full text-center mt-3">{user?.email}</h2>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-primary">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdate;
