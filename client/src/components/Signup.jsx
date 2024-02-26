import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Model from './Model'
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/AuthProvider'
import axios from "axios"
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const {createUser,updateUserProfile}=useContext(AuthContext)
  const navigate=useNavigate()
async function onSubmit(data){
  createUser(data.email,data.password).then(async (result)=>{
    const user=result.user
    updateUserProfile(data.email,data.photoURL).then(async ()=>{
      await axios.post("http://localhost:3000/adduser",{email:data.email})
    })
    alert("Successfully created")
    navigate("/")
  }).catch((error)=>{
    alert("User already exist")
    console.log(error)
  })

}
  return (
    <div className='max-w-md mx-auto flex items-center justify-center my-24 shadow-md rounded-md relative'>
         <div className='model-action mt-0 flex flex-col justify-center'>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className='text-lg font-bold'>Create Account</h3>
              
              <div className="form-control">
              <label className="label">
                  <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" {...register("email")}/>
              </div>
              <div className="form-control">
              <label className="label">
                  <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" {...register("password")}/>
              
              </div>
              <div className="form-control mt-6">
              <input type="submit" value="Sigin" className='btn bg-primary text-white'/>
              </div>
              <p className='text-center mt-2'>Already have an account? <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='text-red underline font-semibold'>Login</button></p>
              <Link
                to="/" 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >✕</Link>
          </form>
      </div>
      <Model/>
    </div>
  )
}

export default Signup