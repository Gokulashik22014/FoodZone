import React from "react";
import { ImSpoonKnife } from "react-icons/im";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";

function UpdateMenu() {
  const item = useLoaderData().data.item;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axisoSecure = useAxiosSecure();
  const navigate = useNavigate();
  const imageApiKey = import.meta.env.VITE_IMGBB_API;
  const onSubmit = async (data) => {
    const apiCall = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
    try {
      let result;
      if (item.image != data.image) {
        result = await axios
          .post(
            apiCall,
            { image: data.image[0] },
            {
              headers: {
                "content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => res.data);
      }
      if (result.success) {
        data.image = result.data.display_url;
      }
      await axisoSecure.patch(`updatemenu/${item._id}`, data);
      console.log("i am running");
      toast.success("Successfully updated", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/dashboard/manageitems"), 1000);
    } catch (error) {
      toast.warn("Something went wrong", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  };
  return (
    <div className="mx-32 md:w-full">
      <h1 className="text-bold md:text-4xl mb-6">
        Update a <span className="text-primary ">Menu Item</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Food Name</span>
          </div>
          <input
            type="text"
            placeholder="Name of the food"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: true })}
            defaultValue={item.name}
          />
        </label>
        <div className="flex justify-between">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select
              className="select select-bordered"
              defaultValue={item.category}
              {...register("category", { required: true })}
            >
              <option disabled selected value="default">
                Select the category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
              <option value="popular">Popular</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="$.."
              className="input input-bordered w-full max-w-xs"
              {...register("price", { required: true })}
              defaultValue={item.price}
            />
          </label>
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Provide the description"
            defaultValue={item.recipe}
            {...register("recipe", { required: true })}
          ></textarea>
        </label>
        <div>
          <label>
            <div className="label">
              <span className="label-text">Picture of the food</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("image", { required: true })}
            />
          </label>
        </div>
        <button className="btn text-basic">
          Update food
          <ImSpoonKnife />
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default UpdateMenu;
