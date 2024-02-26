import React, { useContext, useEffect,useState } from "react";
import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useUsers from "../../hooks/useUsers";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cost, setCost] = useState(0)
  const [callHook,setCallHook]=useState(true)
  const [users,refetch1]=useUsers()
  const userData=users.filter((val)=>val.email===user.email)[0]
  console.log(userData)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/signup")
    }
  },[])
  useEffect(()=>{
    setCost(cart.reduce((current,item)=>current+(item.quantity*item.price),0))
  },[callHook])
  async function handleIncrement(item){
    await axios.put(`http://localhost:3000/quantity/${item._id}?email=${user?.email}`,{cart:cart,quantity:item.quantity+1})
    refetch()
    setCallHook(old=>!old)
  }
  async function handleDecrement(item){
    await axios.put(`http://localhost:3000/quantity/${item._id}?email=${user?.email}`,{cart:cart,quantity:item.quantity>0?item.quantity-1:1})
    refetch()
    setCallHook(old=>!old)
  }
  async function handleDeleteItem(id) {
    await axios
      .post(`http://localhost:3000/deleteitem?email=${user?.email}&id=${id}`)
      .then((result) => console.log(result));
    refetch();
    setCallHook(old=>!old)
  }
  return (
    <div className="section-container my-28">
      <div className="flex justify-center items-center mb-24">
        <h1 className="text-4xl md:text-5xl">
          Your <span className="text-primary">Food</span> is Waiting
        </h1>
      </div>
      {/* cart items */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-basic">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.sort((a,b)=>a.name.localeCompare(b.name)).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-xs" onClick={()=>handleDecrement(item)}>-</button>
                  <input type="number" value={item.quantity} className="w-10 mx-2 text-center appearance-none"/>
                  <button className="btn btn-xs" onClick={()=>handleIncrement(item)}>+</button>
                </td>
                <td>${(item.quantity*item.price).toFixed(2)}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs text-red"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* customer details */}
      <div className="my-12 flex">
        <div className="md:w-1/2 space-y-6">
          <h3 className="font-semibold">Customer Details</h3>
          <h4>Name: {userData?.username || "None"}</h4>
          <h4>email: {userData?.email}</h4>
          <h4>Address: {userData?.address || "None"}</h4>
        </div>
        <div className="md:w-1/2 space-y-6">
          <h3 className="font-semibold">Shopping cost</h3>
          <h4>Total items: {cart.length}</h4>
          <h4>Total cost: ${cost.toFixed(2)}</h4>
          <button className="btn text-basic">Proceed to payment</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
