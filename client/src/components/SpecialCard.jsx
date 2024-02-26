import React, { useContext, useState } from 'react'
import {Link} from "react-router-dom"
import {FaHeart} from "react-icons/fa"

import {toast } from "react-toastify";
import { AuthContext } from '../contexts/AuthProvider';

import axios from 'axios';
import useCart from '../hooks/useCart';
function SpecialCard({item}) {
    const [favourite,setFavourite]=useState(false)
    const {_id,name,price,image}=item
    const {user}=useContext(AuthContext)
    const [addedToCart,setAddedToCart]=useState(false)
    //add to cart message
    const [cart,refetch]=useCart()
  async function handleAddCart(){
    if(user && user?.email){

      await axios.post("http://localhost:3000/additem",{email:user.email,_id})
      setAddedToCart(true)
      toast.success("Successfully added", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
          console.log("hello")
      refetch()
    }else{
      toast.warn('Sigin in to add items', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  }
  return (
    <div className="card md:w-80 w-64 bg-base-100 shadow-xl m-3 relative">
      <div className={`bg-primary px-4 py-4 right-0 -top-1 heart-fill b-trans ${favourite?"text-red":"text-white"} cursor-pointer`} onClick={()=>setFavourite(old=>!old)}>
          <FaHeart/>
      </div>
    <Link to={`/menu/${item._id}`}>
        <figure>
            <img src={item.image} alt="food"  className='hover:scale-105 b-trans w-2/3'/>
        </figure>
    </Link>
    <div className="card-body">
    <Link to={`/menu/${item._id}`}>
      <h2 className="card-title">{item.name}</h2>
    </Link>
      <p className='text-secondary'>Description of the item</p>
      <div className="card-actions justify-between items-center mt-2">
        <h4 className='text-semibold'><span className='text-red'>$</span> {item.price}</h4>
        <button className="btn bg-primary" onClick={addedToCart?()=>console.log("hello bro"):handleAddCart}>{addedToCart?"Food Added":"Add to cart"}</button>
      </div>
    </div>
  </div>
  )
}

export default SpecialCard