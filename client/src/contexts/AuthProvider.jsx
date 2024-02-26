import React, { createContext, useEffect, useState } from 'react'
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile,
    deleteUser 
} from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from "axios"

export const AuthContext=createContext()
const auth=getAuth(app)
const googleProvider = new GoogleAuthProvider();
function AuthProvider({children}) {
    const [user,setUser]=useState(null)
    const [loading, setLoading] = useState(true)
    //creating user with email
    function createUser(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //using google to sigin
    function googleSignin(){
        return signInWithPopup(auth, googleProvider)
    }
    //signin using email
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    //logout
    function logout(){
        return signOut(auth)
    }

    //update the user
    function updateUserProfile(email,profile){
        return updateProfile(auth.currentUser, {
            displayName: email, photoURL: profile
          })
    }
    //deleting the user
    function deleteUserInfo(){
        //needs development
        
    }

    //checking and updating the change of the user
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
                setUser(currentuser)
                const userInfo={
                    email:currentuser.email
                }
                console.log(userInfo)
                axios.post("http://localhost:3000/user/jwt",{userInfo}).then(res=>{
                    localStorage.setItem("access-token",res.data.token)
                }).catch(err=>console.log("I am the problem "+err))
                setLoading(false)
            } else {
                setUser(null)
                localStorage.removeItem("access-token")
                setLoading(false)
            }
          })
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        return ()=>unsubscribe
    },[])
    const authInfo={
        user,
        loading,
        createUser,
        googleSignin,
        login,
        logout,
        updateUserProfile,
        deleteUserInfo,
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider