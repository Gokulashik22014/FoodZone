import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
//importing the custom models
import Menu from "./models/menu.js";

import {menu} from "./public/menu.js"
//importing middlewares
import { verifyToken } from "./middlewares/verifyToken.js";
//importing the routes
import menuRouter from "./router/menu.js"
import cartRouter from "./router/cart.js"
import userRouter from "./router/user.js"
//initialization and others
const app = express();

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());


//using routes
app.get("/", verifyToken,(req, res) => {
  res.json({message:"hello world"})
});
//->handling the verification using jwt
app.post("/user/jwt",async (req,res)=>{
  const user=req.body
  console.log(user)
  try {
    const token=jwt.sign(user,process.env.TOKEN,{
      expiresIn:"1hr",
    })
    res.json({success:true,token})
  } catch (error) {
    res.json({success:false,message:error})
  }
  
})


app.use(menuRouter)
app.use(cartRouter)
app.use(userRouter)



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser  :true,
    useUnifiedTopology:true,
}).then(async()=>{
  app.listen(process.env.PORT , () => console.log(`Server is listening at PORT ${process.env.PORT }...`))
  const count =await Menu.countDocuments()
  if(count==0){
    const data=menu.map(val=>{
      const {_id,...rest}=val
      return rest
    })
    await Menu.insertMany(data)
    console.log("successfully inserted data")
  }
})
.catch(error=>console.log(error))

