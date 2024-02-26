import React, { useEffect } from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit,FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
const Rows=({image,name,price,index,id})=>{
    const [menu,refetch]=useMenu()
    // adding the delete function 
    const axisoSecure=useAxiosSecure()
    const handleDeleteItem=async(id)=>{
        try {
            await axisoSecure.post(`/deletemenu/${id}`).then(res=>console.log(res))
            refetch()
        } catch (error) {
            console.log(error)   
        }
    }
    return (
        <tr>
              <th>
                {index}
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={image}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {name}
              </td>
              <td>${price}</td>
              <th>
                <Link to={`/dashboard/updateitem/${id}`}>
                    <button className="p-2 rounded-lg bg-amber-400 flex justify-center text-white text-center"><FaEdit /></button>
                </Link>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-rose-400" onClick={()=>handleDeleteItem(id)}><FaTrash /></button>
              </th>
            </tr>
    )
}

function ManageItems() {
    const [menu,refetch]=useMenu()
  return (
    <div className="mx-32">
        <h1 className="md:text-4xl text-semibold mb-12">Manage All <span className="text-primary text-bold">Food</span></h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className="text-basic">
            <tr>
              <th>
                #
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((data,index)=><Rows index={index+1} key={data._id} name={data.name} image={data.image} price={data.price} id={data._id}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageItems;
