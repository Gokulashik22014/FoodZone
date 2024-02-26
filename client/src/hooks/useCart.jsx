import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function useCart() {
  const { user } = useContext(AuthContext);
  const token=localStorage.getItem("access-token")
  const {refetch,data:cart=[]} = useQuery({ 
    queryKey: ["getcartitems"], 
    queryFn: async ()=>{
        const res=await axios.get(`http://localhost:3000/getcart?email=${user?.email}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        return res.data.cart
    }
    
});
    return [cart,refetch]
}

export default useCart;
