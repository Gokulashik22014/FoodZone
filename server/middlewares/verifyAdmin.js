import jwt from "jsonwebtoken"
import User from "../models/user.js"

export async function verifyAdmin(req,res,next){
    const email=req.decoded.userInfo.email
    const user=await User.findOne({email:email})
    const isAdmin=user?.admin
    if(!isAdmin){
        return res.json({success:true,message:"Forbidden access"})
    }
    next()
}