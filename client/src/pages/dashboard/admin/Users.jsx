import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthProvider";
import useUsers from "../../../hooks/useUsers";
function Users() {
  const axisoSecure=useAxiosSecure()
  // const {deleteUserInfo}=useContext(AuthContext)
  const token=localStorage.getItem("access-token")
  const [users,refetch]=useUsers()
  
  const handleDeleteUser=async (id)=>{
    await axisoSecure.post(`/deleteuser/${id}`).then(()=>{
      alert("Deleted Successfully")
      // deleteUserInfo()
    })
    refetch()
  }
  const handleMakeAdmin=async(id)=>{
    await axisoSecure.patch(`/makeadmin/${id}`).then(()=>{
      alert("Successfully promoted")
    })
    refetch()
  }
  return (
    <div className="mx-32">
        <h1 className="mb-12 md:text-4xl text-xl">Users</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="text-basic">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.name || "user" + index}</td>
                  <td>{data.email}</td>
                  <td>
                    <button onClick={()=>handleMakeAdmin(data._id)} className={`text-white px-2 py-1 rounded-full ${data.admin? "bg-violet-700":"bg-amber-400"}`}>{data.admin ? "Admin" : "User"}</button>
                  </td>
                  <td>
                      <button className="bg-rose-500 text-white p-1 rounded-lg text-center hover:bg-stone-300" onClick={()=>handleDeleteUser(data._id)}>

                    <FaTrash />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
