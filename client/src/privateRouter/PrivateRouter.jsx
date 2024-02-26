import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import Loading from '../components/Loading'

function PrivateRouter({children}) {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()
    if(loading){
        <Loading/>
    }
    if(user){
        return children
    }
  return (
    <Navigate to="/signup" state={{from:location}}></Navigate>
  )
}

export default PrivateRouter