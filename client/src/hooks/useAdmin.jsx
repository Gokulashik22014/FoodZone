import React,{useContext} from 'react'
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from './useAxiosSecure';
function useAdmin() {
    const { user } = useContext(AuthContext);
    const axisoSecure=useAxiosSecure()
    const {refetch,data:isAdmin,isPending:isAdminLoading} = useQuery({ 
        queryKey: [user?.email,"isAdmin"], 
        queryFn: async ()=>{
            const res=await axisoSecure.get(`admin/${user?.email}`)
            return res.data?.admin
        }
        
    });
    
    return [isAdmin,isAdminLoading]
}

export default useAdmin