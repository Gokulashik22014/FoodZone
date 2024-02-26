import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios"

const axiosSecure=axios.create({
    baseURL:"http://localhost:3000"
})
function useAxiosSecure() {
    const navigate=useNavigate()
    const { logout } = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        const token=localStorage.getItem("access-token")
        config.headers.authorization=`Bearer ${token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    
    
    axiosSecure.interceptors.response.use(function (response) {
        
        return response;
      }, async (error)=> {
        console.log(error)
        await logout()
        navigate("/")
        return Promise.reject(error);
      });

  return axiosSecure
}

export default useAxiosSecure