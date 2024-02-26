import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        cart:{
            type:Array,
            default:[]
        },
        admin:{
            type:Boolean,
            default:false
        },
        photoURL:{
            type:String,
            default:"",
        },
        address:{
            type:String,
            default:"temporary",
        },
        username:{
            type:String,
        }
    }
)

const User=mongoose.model("User",userSchema,"users")

export default User