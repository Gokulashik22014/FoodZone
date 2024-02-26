import React, { useContext } from "react";
import { Link,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";
import axios from "axios";
function Model() {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { googleSignin, login,updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  //sigin using google
  async function handleSigin() {
    googleSignin()
      .then(async(result) => {
        const user = result.user;
        document.getElementById("my_modal_3").close();
        updateUserProfile(user.email,user.photoURL).then(async ()=>{
          await axios.post("http://localhost:3000/adduser",{email:user.email})
        })
        
        navigate("/");
        console.log("in google")
        alert("Successfully logged");
      })
      .catch((error) => console.log(error));
  }
  //singin using email
  function handleLogin(data) {
    setErrorMessage(null);
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        document.getElementById("my_modal_3").close();
        navigate("/");
        alert("Successfully logged");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Email or Password is wrong!!");
      });
  }

  return (
    <dialog id="my_modal_3" className="modal model-middle">
      <div className="modal-box">
        <div className="model-action mt-0 flex flex-col justify-center">
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <h3 className="text-lg font-bold">LOGIN</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              {errorMessage ? (
                <p className="text-xs text-red italic">{errorMessage}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-primary text-white"
              />
            </div>
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red underline font-semibold">
                Signin now
              </Link>
            </p>
            <button
              onClick={() => document.getElementById("my_modal_3").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <button
            className="flex border md:mx-24 px-6 py-3 rounded-lg border-zinc-300 justify-center gap-6 hover:bg-zinc-200"
            onClick={handleSigin}
          >
            {" "}
            <img
              src="/images/google.webp"
              alt="image"
              className="w-6 h-6"
            />{" "}
            Login with Google
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Model;
