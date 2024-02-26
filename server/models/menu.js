import mongoose from "mongoose";

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    recipe:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:Date.now
    }
})

const Menu=mongoose.model("menu",menuSchema,"menu")
export default Menu
